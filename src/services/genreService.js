import axiosInstance from "../config/axiosInstance.js";
import { API_ENDPOINTS } from "../config/api.config.js";

export async function getAllGenres() {
  const response = await axiosInstance.get(API_ENDPOINTS.GENRES);
  return response.data;
}

export async function createGenre(name, token) {
  const response = await axiosInstance.post(
    API_ENDPOINTS.GENRES,
    { name: name.trim() },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

export async function updateGenre(id, name, token) {
  const response = await axiosInstance.put(
    API_ENDPOINTS.GENRES,
    { id, newName: name.trim() },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

export async function deleteGenre(id, token) {
  const response = await axiosInstance.delete(API_ENDPOINTS.GENRE_BY_ID(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export function getGenreErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (data?.title) return data.title;
  return "Error de conexión con el servidor";
}
