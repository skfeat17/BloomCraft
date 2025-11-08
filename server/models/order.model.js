import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    shippingDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingDetail",
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
   
    orderStatus: {
      type: String,
      enum: ["Processing","Ordered", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
