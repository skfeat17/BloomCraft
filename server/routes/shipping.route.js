import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import {
  addShippingDetails,
  getShippingDetails,
  updateShippingDetails,
  deleteShippingDetails,
} from "../controllers/shipping.controller.js";

const router = Router();

// Add shipping info
router.post("/add", authenticate, addShippingDetails);

// Get user's shipping info
router.get("/", authenticate, getShippingDetails);

// Update user's shipping info
router.put("/update", authenticate, updateShippingDetails);

// Delete user's shipping info
router.delete("/delete", authenticate, deleteShippingDetails);

export default router;
