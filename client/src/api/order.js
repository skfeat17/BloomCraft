import { apiRequestHandler } from "./api.js";

export async function getAllOrdersHandler(token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/order/all",
    "GET",
    null,
    token
  );
}
export async function getSingleOrderHandler(orderId,token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    `/order/${orderId}`,
    "GET",
    null,
    token
  );
}

export async function createOrderHandler(orderData,token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/order/create",
    "POST",
    orderData,
    token
  );
}