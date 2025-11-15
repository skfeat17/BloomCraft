import { apiRequestHandler } from "./api";

export async function getAllProductsHandler(query = "") {
  return await apiRequestHandler(
    `/product/all${query}`,
    "GET",
    null
  );
}

export async function getSingleProductHandler(productId) {
  return await apiRequestHandler(
    `/product/${productId}`,
    "GET",
    null
  );
}