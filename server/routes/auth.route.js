import { Router } from "express";
import { registerUser,loginUser, sendOTP, resetPassword, verifyEmail, logoutUser, getCurrentUser, updateProfile, changePassword } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";


const router = Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/send-otp",sendOTP)
router.post("/reset-password",resetPassword);
//secured routes
router.put("/verify-email",authenticate,verifyEmail)
router.post("/logout",authenticate,logoutUser)
router.get("/user",authenticate,getCurrentUser)
router.put("/update",authenticate,updateProfile)
router.put("/change-password",authenticate,changePassword)

export default router;