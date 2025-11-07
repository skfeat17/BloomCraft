import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { createCheckoutSession, getPaymentStatus } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-checkout-session/:id", authenticate, createCheckoutSession);
router.get("/status",getPaymentStatus)

export default router;
