import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      default: "Flowers",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
