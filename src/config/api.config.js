const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7256";

export const API_ENDPOINTS = {
  REGISTER: "/api/user",
  LOGIN: "/api/Auth/login",

  USERS: "/api/User",
  USER_PROFILE: "/api/user/profile",
  USER_BY_ID: (id) => `/api/user/${id}`,
  USER_DELETE: (id) => `/api/user/${id}/soft`,

  GAMES: "/api/Game",
  GAME_BY_ID: (id) => `/api/Game/${id}`,
  GAME_SEARCH: (query) => `/api/Game/search?name=${encodeURIComponent(query)}`,
  GAME_AVAILABLE: (id) => `/api/Game/${id}/available`,
  GAME_NOT_AVAILABLE: (id) => `/api/Game/${id}/notavailable`,

  PLATFORMS: "/api/Platform",
  PLATFORM_BY_ID: (id) => `/api/Platform/${id}`,

  GENRES: "/api/Genre",
  GENRE_BY_ID: (id) => `/api/Genre/${id}`,

  ORDERS: "/api/Orders",
  ORDERS_BY_USER: (userId) => `/api/Orders/user/${userId}`,
};

export default API_BASE_URL;
