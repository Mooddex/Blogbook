// client/lib/axios.ts
import axios from "axios";
import Cookies from "js-cookie"; // npm install js-cookie

const api = axios.create({
  baseURL: "/api", // This adds /api to all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token from cookies to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // read from cookie instead of localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
