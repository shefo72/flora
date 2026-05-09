import axios from "axios";

export const BASE_URL = "https://floraapi-production-e891.up.railway.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global Interceptor for Error Handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Basic global error logging
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    console.error("[Axios API Error]:", message);
    
    return Promise.reject(error);
  }
);
