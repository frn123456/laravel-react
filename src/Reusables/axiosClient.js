// axiosClient.js
import axios from "axios";
import { getAccessToken, setAccessToken } from "./auth";

const axiosClient = axios.create({
  baseURL: "https://laravel-backend-production-d2e9.up.railway.app/api",
  withCredentials: true,
});

// Attach access token to every request
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically handle 401 errors and refresh token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosClient.post("/refresh");
        const newAccessToken = refreshResponse.data.access_token;
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Optional: redirect to login or clear state
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
