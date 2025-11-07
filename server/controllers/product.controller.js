import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";



/* ----------------------------- GET ALL PRODUCTS ----------------------------- */
// ?sort=price_asc | price_desc | newest | oldest
// ?search=flower
export const getAllProducts = asyncHandler(async (req, res) => {
  const { sort, search } = req.query;

  let query = {};

  if (search) {
    query = {
      ...query,
      title: { $regex: search, $options: "i" },
    };
  }

  let productsQuery = Product.find(query);

  if (sort === "price_asc") productsQuery = productsQuery.sort({ price: 1 });
  else if (sort === "price_desc") productsQuery = productsQuery.sort({ price: -1 });
  else if (sort === "newest") productsQuery = productsQuery.sort({ createdAt: -1 });
  else if (sort === "oldest") productsQuery = productsQuery.sort({ createdAt: 1 });

  const products = await productsQuery.exec();

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

/* ---------------------------- GET SINGLE PRODUCT ---------------------------- */
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

