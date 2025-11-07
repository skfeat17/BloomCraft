import Stripe from "stripe";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import dotenv from "dotenv";
import path from "path";
// Load environment variables
dotenv.config({
  path: path.resolve("../.env"),
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ⚡ Webhook Controller
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify Stripe Signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    // ✅ Successful Payment
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("✅ Payment success for order:", session.metadata.orderId);

      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent
        );

        // Update order
        const order = await Order.findById(session.metadata.orderId);
        if (order) {
          order.paymentStatus = "Paid";
          order.orderStatus = "Ordered";
          await order.save();
        }

        // Create Payment Record
        const payment = await Payment.create({
          userId: session.metadata.userId,
          orderId: session.metadata.orderId,
          stripePaymentIntentId: session.payment_intent,
          amount: session.amount_total / 100,
          currency: session.currency,
          status: paymentIntent.status || "succeeded",
          paymentMethod: paymentIntent.payment_method_types?.[0] || "card",
          receiptUrl: paymentIntent.charges?.data?.[0]?.receipt_url || "",
          refunded: paymentIntent.status === "refunded",
        });

        console.log("💰 Payment document created:", payment._id);
      } catch (error) {
        console.error("⚠️ Error saving payment:", error.message);
      }
      break;
    }

    // ❌ Failed Payment
    case "payment_intent.payment_failed": {
      const intent = event.data.object;
      const metadata = intent.metadata || {};
      console.log("Payment Error",intent.last_payment_error.message)
      try {
        // Create failed payment record
        await Payment.create({
          userId: metadata.userId || null,
          orderId: metadata.orderId || null,
          stripePaymentIntentId: intent.id,
          amount: intent.amount ? intent.amount / 100 : 0,
          currency: intent.currency || "myr",
          status: "failed",
          paymentError: intent.last_payment_error.message,
        });

        // Optionally mark order as failed
        if (metadata.orderId) {
          await Order.findByIdAndUpdate(metadata.orderId, {
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
          });
        }
      } catch (error) {
        console.error("⚠️ Error handling failed payment:", error.message);
      }
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};
