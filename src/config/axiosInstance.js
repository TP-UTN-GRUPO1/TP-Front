import axios from "axios";
import API_BASE_URL from "./api.config.js";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("📤 Request:", {
      method: config.method.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("❌ Error en request:", error);
    return Promise.reject(error);
  },
);

// Interceptor de response
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response exitosa:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ Response error:", {
      code: error.code,
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
