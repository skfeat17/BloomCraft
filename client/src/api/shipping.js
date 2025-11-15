import { apiRequestHandler } from "./api.js";

export async function getShippingDetailsHandler(token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/shipping",
    "GET",
    null,
    token
  );
}

export async function addShippingDetailsHandler(shippingData, token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/shipping/add",
    "POST",
    shippingData,
    token
  );
}

export async function updateShippingDetailsHandler(shippingData, token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/shipping/update",
    "PUT",
    shippingData,
    token
  );
}