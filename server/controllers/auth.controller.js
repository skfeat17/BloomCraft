import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/nodemailer.js";
import OTP from "../models/otp.model.js";
const httpOptions = {
  httpOnly: true,
  secure: true,
};
//REGISTER A USER
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(403, "All Fields are required");
  }
  const existingUSer = await User.findOne({ email });
  if (!!existingUSer) {
    throw new ApiError(403, "Email already exists");
  }
  const user = await User.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
  if (!user) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }
  const accessToken = user.generateAccessToken();
  const createdUser = await User.findById(user._id).select("-password");
  res
    .cookie("accessToken", accessToken, httpOptions)
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken },
        "User Created Successfully"
      )
    );
});
// LOGIN A USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password");
  }
  const accessToken = user.generateAccessToken();
  const loggedInUser = await User.findById(user._id).select("-password");
  res
    .status(200)
    .cookie("accessToken", accessToken, httpOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "Login Successful"
      )
    );
});
//SEND OTP
export const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const existingOTP = await OTP.findOne({ email: email.toLowerCase() });
  if (existingOTP && Date.now() - existingOTP.createdAt < 60000) {
    throw new ApiError(
      429,
      "Please wait 1 minute before requesting another OTP"
    );
  }
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  await sendEmail({
    to: user.email.toLowerCase(),
    name: user.firstName,
    otp,
  });
  //This will Invalidate the Previously Generated OTP
  await OTP.findOneAndDelete({ email: email.toLowerCase() });
  await OTP.create({ email: email.toLowerCase(), otp });

  res.status(200).json(new ApiResponse(200, null, "OTP Sent Successfully"));
});
//RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    throw new ApiError(403, "OTP,Email and New Password are required");
  }
  const otpRecord = await OTP.findOne({ email: email.toLowerCase() });
  if (!otpRecord) {
    throw new ApiError(403, "Invalid or Expired OTP");
  }
  if (otp.toString() != otpRecord.otp) {
    throw new ApiError(403, "Incorrect OTP");
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  user.password = newPassword;
  await user.save();
  await OTP.findByIdAndDelete(otpRecord._id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Passoword Reset Successfully"));
});
//VERIFY EMAIL
export const verifyEmail = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const email = req.user.email;
  if (req.user.verified == true) {
    throw new ApiError(403, "Email Already Verified");
  }
  if (!otp) {
    throw new ApiError(403, "OTP is required");
  }
  const otpRecord = await OTP.findOne({ email: email.toLowerCase() });
  if (!otpRecord) {
    throw new ApiError(403, "Invalid or Expired OTP");
  }
  if (otp.toString() != otpRecord.otp) {
    throw new ApiError(403, "Incorrect OTP");
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  user.verified = true;
  await user.save();
  await OTP.findByIdAndDelete(otpRecord._id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified Successfully"));
});
// LOGOUT USER
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken", { httpOnly: true, secure: true })
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
// GET CURRENT USER
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// UPDATE USER PROFILE
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");
  if (firstName) user.firstName = firstName.trim();
  if (lastName) user.lastName = lastName.trim();
  await user.save();

  res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});
// CHANGE PASSWORD
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new passwords are required");
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) throw new ApiError(401, "Incorrect old password");

  user.password = newPassword;
  await user.save();

  res.status(200).json(new ApiResponse(200, null, "Password changed successfully"));
});

