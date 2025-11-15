import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: { type: String, required: true }
});

export const VerificationToken = mongoose.model("VerificationToken", verificationSchema);
