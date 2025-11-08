import express from "express";
import {
  updateOrderStatus,
  getAllOrders,
  getSingleOrder,
  getOrdersByUser,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { adminAuth } from "../middlewares/checkAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

// ⚡ All routes are protected and only for Admin
router.use(authenticate);
router.use(adminAuth);
//TODO: MAKE ROUTES ON POST MAN FOR THEM
// ------------------------ ORDERS ------------------------

// Update order status
router.put("/order/update/:id", updateOrderStatus);

// Get all orders with filters and pagination
router.get("/orders", getAllOrders);

// Get a single order by orderId
router.get("/order/:id", getSingleOrder);

// Get all orders of a particular user
router.get("/orders/user", getOrdersByUser); // expects query param: userId, status, startDate, endDate, limit, skip

// ------------------------ PRODUCTS ------------------------

// Create a new product
router.post("/product/create",  upload.array("images", 5), createProduct);

// Update a product
router.put("/product/update/:id",  upload.array("images", 5), updateProduct);

// Delete a product
router.delete("/product/delete/:id", deleteProduct);

export default router;
