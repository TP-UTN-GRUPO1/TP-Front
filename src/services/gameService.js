import axiosInstance from "../config/axiosInstance.js";
import { API_ENDPOINTS } from "../config/api.config.js";

/**
 * Mapea la respuesta del backend .NET al formato que usa el frontend.
 * Backend: { id, title, developer, imageUrl, price, rating, available, sold, platform, genre }
 * Frontend: { id, nameGame, developer, imageURL, price, rating, available, sold, genres, platforms }
 */
function mapGameFromAPI(game) {
  // Backend usa "platform" y "genre" (singular), frontend usa "platforms" y "genres"
  const rawGenres = game.genre || game.genres || [];
  const rawPlatforms = game.platform || game.platforms || [];

  return {
    id: game.id,
    nameGame: game.title,
    developer: game.developer,
    imageURL: game.imageUrl,
    price: game.price,
    rating: game.rating,
    available: game.available,
    sold: game.sold,
    genres: rawGenres.map((g) =>
      typeof g === "string"
        ? { genreName: g }
        : { genreName: g.name || g.genreName },
    ),
    platforms: rawPlatforms.map((p) =>
      typeof p === "string"
        ? { platformName: p }
        : { platformName: p.name || p.platformName },
    ),
  };
}

/**
 * Mapea los datos del frontend al formato que espera el backend .NET.
 */
function mapGameToAPI(game) {
  return {
    title: game.nameGame || game.title,
    developer: game.developer,
    imageUrl: game.imageURL || game.imageUrl,
    price: Number(game.price),
    rating: Number(game.rating || 0),
    available: game.available ?? true,
    sold: Number(game.sold || 0),
    genres:
      game.genres?.map((g) => (typeof g === "string" ? g : g.genreName)) || [],
    platforms:
      game.platforms?.map((p) =>
        typeof p === "string" ? p : p.platformName,
      ) || [],
  };
}

/** Obtener todos los juegos */
export async function getAllGames() {
  const response = await axiosInstance.get(API_ENDPOINTS.GAMES);
  return response.data.map(mapGameFromAPI);
}

/** Obtener un juego por ID */
export async function getGameById(id) {
  const response = await axiosInstance.get(API_ENDPOINTS.GAME_BY_ID(id));
  return mapGameFromAPI(response.data);
}

/** Buscar juegos por nombre */
export async function searchGames(query) {
  const response = await axiosInstance.get(API_ENDPOINTS.GAME_SEARCH(query));
  return response.data.map(mapGameFromAPI);
}

/** Crear un juego nuevo */
export async function createGame(gameData, token) {
  const response = await axiosInstance.post(
    API_ENDPOINTS.GAMES,
    mapGameToAPI(gameData),
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
}

/** Actualizar un juego existente */
export async function updateGame(id, gameData, token) {
  const response = await axiosInstance.put(
    API_ENDPOINTS.GAME_BY_ID(id),
    mapGameToAPI(gameData),
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
}

/** Activar un juego (PATCH) */
export async function setGameAvailable(id, token) {
  const response = await axiosInstance.patch(
    API_ENDPOINTS.GAME_AVAILABLE(id),
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
}

/** Desactivar un juego (PATCH) */
export async function setGameNotAvailable(id, token) {
  const response = await axiosInstance.patch(
    API_ENDPOINTS.GAME_NOT_AVAILABLE(id),
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
}
