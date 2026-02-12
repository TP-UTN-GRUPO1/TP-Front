// Configuración centralizada de APIs
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7256";

export const API_ENDPOINTS = {
  // Auth
  REGISTER: "/api/user",
  LOGIN: "/api/Auth/login",

  // Usuarios
  USER_PROFILE: "/api/user/profile",

  // Juegos
  GAMES: "/api/Game",
  GAME_BY_ID: (id) => `/api/Game/${id}`,
  GAME_SEARCH: (query) => `/api/Game/search?name=${encodeURIComponent(query)}`,
  GAME_AVAILABLE: (id) => `/api/Game/${id}/available`,
  GAME_NOT_AVAILABLE: (id) => `/api/Game/${id}/notavailable`,

  // Plataformas
  PLATFORMS: "/api/Platform",
  PLATFORM_BY_ID: (id) => `/api/Platform/${id}`,

  // Géneros
  GENRES: "/api/Genre",
  GENRE_BY_ID: (id) => `/api/Genre/${id}`,

  // Órdenes
  ORDERS: "/api/Orders",
  ORDERS_BY_USER: (userId) => `/api/Orders/user/${userId}`,
};

export default API_BASE_URL;
