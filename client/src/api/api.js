// api.js
const isProd = import.meta.env.MODE === "production";

// ✅ Use relative path on production (for Vercel serverless)
export const api = isProd ? "" : "http://localhost:8000/api";

class ApiResponse {
  constructor(res, data) {
    this.ok = res.ok;
    this.status = res.status;
    this.data = data?.data || null;
    this.message = data?.message || null;
  }
}

// ✅ Simulated network delay (optional)
const ENABLE_DELAY = false;
const DELAY_MS = 1200;

export async function apiRequestHandler(
  endpoint,
  method = "GET",
  body = null,
  token = null
) {
  if (ENABLE_DELAY) {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${api}${endpoint}`, {
    method,
    headers,
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: "Invalid JSON response" };
  }

  console.log(`API Request to ${endpoint} Response:`, data);

  return new ApiResponse(res, data);
}
