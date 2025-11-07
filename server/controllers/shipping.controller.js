import ShippingDetails from "../models/shippingDetail.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/* -------------------------- ADD SHIPPING DETAILS -------------------------- */
export const addShippingDetails = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    houseNo,
    street,
    landmark,
    address,
    country,
    state,
    city,
    pincode,
    phone,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !houseNo ||
    !street ||
    !address ||
    !country ||
    !state ||
    !city ||
    !pincode ||
    !phone 
  ) {
    throw new ApiError(400, "All required fields must be filled");
  }

  // check if user already added one
  const existing = await ShippingDetails.findOne({ user: req.user._id });
  if (existing) {
    throw new ApiError(400, "Shipping details already exist for this user");
  }

  const shipping = await ShippingDetails.create({
    user: req.user._id,
    firstName,
    lastName,
    houseNo,
    street,
    landmark,
    address,
    country,
    state,
    city,
    pincode,
    phone
  });

  res
    .status(201)
    .json(new ApiResponse(201, shipping, "Shipping details added successfully"));
});

/* -------------------------- GET SHIPPING DETAILS -------------------------- */
export const getShippingDetails = asyncHandler(async (req, res) => {
  const shipping = await ShippingDetails.findOne({ user: req.user._id });

  if (!shipping) {
    throw new ApiError(404, "No shipping details found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, shipping, "Shipping details fetched successfully"));
});

/* -------------------------- UPDATE SHIPPING DETAILS -------------------------- */
export const updateShippingDetails = asyncHandler(async (req, res) => {
  const updates = req.body;
  const shipping = await ShippingDetails.findOneAndUpdate(
    { user: req.user._id },
    updates,
    { new: true, runValidators: true }
  );

  if (!shipping) {
    throw new ApiError(404, "Shipping details not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, shipping, "Shipping details updated successfully"));
});

/* -------------------------- DELETE SHIPPING DETAILS -------------------------- */
export const deleteShippingDetails = asyncHandler(async (req, res) => {
  const shipping = await ShippingDetails.findOneAndDelete({ user: req.user._id });

  if (!shipping) {
    throw new ApiError(404, "No shipping details found to delete");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Shipping details deleted successfully"));
});
