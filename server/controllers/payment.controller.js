import Stripe from "stripe";
import Order from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Payment from "../models/payment.model.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ CREATE CHECKOUT SESSION
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const orderId = id;

  if (!orderId) throw new ApiError(400, "Order ID is required");

  // Get order details
  const order = await Order.findById(orderId).populate("items.productId");
  if (!order) throw new ApiError(404, "Order not found");
  // Build line items from the order
  const lineItems = order.items.map((item) => ({
    price_data: {
      currency: "myr",
      product_data: {
        name: item.productId.title,
        description: item.productId.description,
        images: item.productId.images,
      },
      unit_amount: Math.round(item.productId.price * 100),
    },
    quantity: 1, // you can add quantity field in order model if needed
  }));
  const shippingCharge = 15; // Example: RM15
  lineItems.push({
    price_data: {
      currency: "myr",
      product_data: {
        name: "Shipping Charges",
        description: "Standard Delivery (3–5 days)",
        images:["https://cdn-icons-png.flaticon.com/512/5952/5952766.png"]
      },
      unit_amount: Math.round(shippingCharge * 100),
    },
    quantity: 1,
  });

  // Create a Checkout Session
 const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",
  line_items: lineItems,
  success_url: `http://localhost:8000/api/payment/status?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `https://yourfrontend.com/failed`,
  
  // ✅ attach metadata to both session and payment intent
  metadata: {
    orderId: order._id.toString(),
    userId: req.user._id.toString(),
  },
  payment_intent_data: {
    metadata: {
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
    },
  },
});

  res
    .status(200)
    .json(
      new ApiResponse(200, { url: session.url }, "Checkout session created")
    );
});

export const getPaymentStatus = asyncHandler(async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) throw new ApiError(400, "session_id is required");
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const { orderId } = session.metadata || {};
  // Fetch order + payment from DB
  const order = await Order.findById(orderId).populate({
    path: "items.productId",
    select: "title images price",
  });

  if (order.paymentStatus != "Paid")
    throw new ApiError(404, "Payment Failed");

  const payment = await Payment.findOne({ orderId });
  if (!order || !payment) throw new ApiError(404, "Order or Payment not found");
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {paymentStatus:payment.status, order, payment },
        "Payment Status Fetched Successfully"
      )
    );
});
