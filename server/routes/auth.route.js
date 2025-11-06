import { Router } from "express";
import { registerUser,loginUser, sendOTP } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/otp/send",sendOTP)

export default router;