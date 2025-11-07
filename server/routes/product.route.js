import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct
} from "../controllers/product.controller.js";

const router = Router();

/* ---------------------------- PUBLIC ROUTES --------------------------- */
// Get all products (with optional ?search & ?sort)
router.get("/all", getAllProducts);
// Get a single product by ID
router.get("/:id", getSingleProduct);

export default router;
