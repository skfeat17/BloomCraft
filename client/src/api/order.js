import { apiRequestHandler } from "./api.js";

export async function getAllOrdersHandler() {
  return await apiRequestHandler(
    "/order/all",
    "GET",
    null
  );
}
export async function getSingleOrderHandler(orderId) {
  return await apiRequestHandler(
    `/order/${orderId}`,
    "GET",
    null
  );
}

export async function createOrderHandler(orderData) {
  return await apiRequestHandler(
    "/order/create",
    "POST",
    orderData
  );
}