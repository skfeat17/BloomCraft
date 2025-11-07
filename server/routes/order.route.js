import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import {
  createOrder,
  getUserOrders,
  getSingleOrder
} from "../controllers/order.controller.js";

const router = Router();

// User routes
router.post("/create", authenticate, createOrder);
router.get("/all", authenticate, getUserOrders);
router.get("/:id", authenticate, getSingleOrder);


export default router;
