// Configuración centralizada de APIs
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7256";

export const API_ENDPOINTS = {
  // Auth
  REGISTER: "/api/user",
  LOGIN: "/api/Auth/login",

  // Usuarios
  USER_PROFILE: "/api/user/profile",

  // Productos
  PRODUCTS: "/api/products",

  // Más endpoints según necesites
};

export default API_BASE_URL;
