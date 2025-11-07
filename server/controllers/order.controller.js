import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ShippingDetails from "../models/shippingDetail.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


/* ---------------------------- CREATE ORDER ---------------------------- */
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingDetails, totalAmount } = req.body;

  if (!items || items.length === 0) {
    throw new ApiError(400, "Order must contain at least one item");
  }
  if (!shippingDetails || !totalAmount) {
    throw new ApiError(400, "Shipping details and total amount are required");
  }

  // Validate shipping details
  const shipping = await ShippingDetails.findById(shippingDetails);
  console.log("Details for Ship:", shippingDetails);
  if (!shipping) {
    throw new ApiError(404, "Shipping details not found");
  }

  // Validate each product
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new ApiError(404, `Product not found: ${item.productId}`);
    }
  }

  // Create order
  const order = await Order.create({
    userId: req.user._id,
    items,
    shippingDetails,
    totalAmount,
    paymentStatus: "Pending",
    orderStatus: "Processing",
  });

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

/* ---------------------------- GET USER ORDERS ---------------------------- */
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .populate("items.productId", "title price images")
    .populate("shippingDetails");

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

/* ---------------------------- GET ONE ORDER ---------------------------- */
export const getSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("items.productId", "title price images")
    .populate("shippingDetails");

  if (!order) throw new ApiError(404, "Order not found");
  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});
