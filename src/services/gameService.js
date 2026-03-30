import axiosInstance from "../config/axiosInstance.js";
import { API_ENDPOINTS } from "../config/api.config.js";

function mapGameFromAPI(game) {
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

export async function getAllGames() {
  const response = await axiosInstance.get(API_ENDPOINTS.GAMES);
  return response.data.map(mapGameFromAPI);
}

export async function getGameById(id) {
  const response = await axiosInstance.get(API_ENDPOINTS.GAME_BY_ID(id));
  const game = mapGameFromAPI(response.data);

  if (game.genres.length === 0 && game.platforms.length === 0) {
    try {
      const allGames = await getAllGames();
      const fullGame = allGames.find((g) => g.id === game.id);
      if (fullGame) {
        game.genres = fullGame.genres;
        game.platforms = fullGame.platforms;
      }
    } catch (e) {}
  }

  return game;
}

export async function searchGames(query) {
  const response = await axiosInstance.get(API_ENDPOINTS.GAME_SEARCH(query));
  return response.data.map(mapGameFromAPI);
}

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
