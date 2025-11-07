import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

/* ---------------------------- UPDATE ORDER STATUS (ADMIN) ---------------------------- */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order updated successfully"));
});

/* ------------------------ GET ALL ORDERS (ADMIN) ------------------------ */
export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, startDate, endDate, limit = 10, skip = 0 } = req.query;

  const query = {};

  // Filter by orderStatus
  if (status) {
    if (status.toLowerCase() === "completed") query.orderStatus = "Delivered";
    else if (status.toLowerCase() === "pending")
      query.orderStatus = { $ne: "Delivered" };
  }

  // Filter by date range
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const orders = await Order.find(query)
    .populate("userId", "firstName lastName email")
    .populate("items.productId", "title price images")
    .populate("shippingDetails")
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  const totalOrders = await Order.countDocuments(query);

  res.status(200).json(
    new ApiResponse(
      200,
      { orders, total: totalOrders, limit: parseInt(limit), skip: parseInt(skip) },
      "Orders fetched successfully"
    )
  );
});

/* ------------------------ CREATE PRODUCT (ADMIN ONLY) ------------------------ */
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;
  console.table([title,description,price])
  if (!title || !description || !price) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "Product image is required");
  }

  const imageUrls = [];
  for (const file of req.files) {
    const result = await uploadToCloudinary(file.buffer, "products");
    imageUrls.push(result.secure_url);
  }

  const product = await Product.create({
    title: title.trim(),
    description: description.trim(),
    price,
    images: imageUrls,
  });

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

/* ---------------------------- UPDATE PRODUCT ---------------------------- */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  if (req.files && req.files.length > 0) {
    const imageUrls = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, "products");
      imageUrls.push(result.secure_url);
    }
    product.images = imageUrls;
  }

  if (title) product.title = title.trim();
  if (description) product.description = description.trim();
  if (price) product.price = price;

  const updated = await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Product updated successfully"));
});

/* ---------------------------- DELETE PRODUCT ---------------------------- */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  await product.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});
/* ---------------------------- GET SINGLE ORDER (ADMIN) ---------------------------- */
export const getSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("userId", "firstName lastName email")
    .populate("items.productId", "title price images")
    .populate("shippingDetails");

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));
});

/* ------------------------ GET ORDERS BY USER (ADMIN) ------------------------ */
export const getOrdersByUser = asyncHandler(async (req, res) => {
  const { userId, status, startDate, endDate, limit = 10, skip = 0 } = req.query;

  if (!userId) throw new ApiError(400, "User ID is required");

  const query = { userId };

  // Filter by orderStatus
  if (status) {
    if (status.toLowerCase() === "completed") query.orderStatus = "Delivered";
    else if (status.toLowerCase() === "pending")
      query.orderStatus = { $ne: "Delivered" };
  }

  // Filter by date range
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const orders = await Order.find(query)
    .populate("items.productId", "title price images")
    .populate("shippingDetails")
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  const totalOrders = await Order.countDocuments(query);

  res.status(200).json(
    new ApiResponse(
      200,
      { orders, total: totalOrders, limit: parseInt(limit), skip: parseInt(skip) },
      "User orders fetched successfully"
    )
  );
});
