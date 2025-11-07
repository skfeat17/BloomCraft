import { ApiError } from "../utils/ApiError.js";

export const adminAuth = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    throw new ApiError(403, "Access denied");
  }
  next();
};