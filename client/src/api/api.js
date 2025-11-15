const api = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

class ApiResponse {
  constructor(res, data) {
    this.ok = res.ok;
    this.status = res.status;
    this.data = data?.data || null;
    this.message = data?.message || null;
  }
}

// ✅ Global delay toggle (set to true to simulate slow network)
const ENABLE_DELAY = true;
const DELAY_MS = 1200; // 1.2 seconds

export async function apiRequestHandler(
  endpoint,
  method = "GET",
  body = null,
  token = null
) {
  // ✅ Artificial delay
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

  const data = await res.json();
  console.log(`API Request to ${endpoint} Response:`, data);

  return new ApiResponse(res, data);
}
