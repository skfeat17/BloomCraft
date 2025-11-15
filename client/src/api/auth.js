import { apiRequestHandler } from "./api.js";

export async function loginHandler(email, password) {
  return await apiRequestHandler(
    "/auth/login",
    "POST",
    { email, password }
  );
}

export async function registerHandler(firstName, lastName, email, password) {
  return await apiRequestHandler(
    "/auth/register",
    "POST",
    { firstName, lastName,email, password }
  );
}

export async function sendOtpHandler(email) {
  return await apiRequestHandler(
    "/auth/send-otp",
    "POST",
    { email }
  );
}

export async function logoutHandler(token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/auth/logout",
    "POST",
    null,
    token
  );
}

export async function getCurrentUserHandler(token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/auth/me",
    "GET",
    null,
    token
  );
}

export async function verifyEmailHandler(otp, token = localStorage.getItem("accessToken") || null) {
  return await apiRequestHandler(
    "/auth/verify-email",
    "PUT",
    { otp },
    token
  );
}