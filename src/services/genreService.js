import axiosInstance from "../config/axiosInstance.js";
import { API_ENDPOINTS } from "../config/api.config.js";

/**
 * Response DTO: { id: number, name: string }
 * CreateRequest: { name: string }
 * UpdateRequest: { id: number, name: string }
 */

/** Obtener todos los géneros → GenreResponse[] */
export async function getAllGenres() {
  const response = await axiosInstance.get(API_ENDPOINTS.GENRES);
  return response.data;
}

/** Crear un género (Admin/SysAdmin) */
export async function createGenre(name, token) {
  const response = await axiosInstance.post(
    API_ENDPOINTS.GENRES,
    { name: name.trim() },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

/** Actualizar un género (Admin) */
export async function updateGenre(id, name, token) {
  const response = await axiosInstance.put(
    API_ENDPOINTS.GENRES,
    { id, name: name.trim() },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

/** Eliminar un género (Admin) */
export async function deleteGenre(id, token) {
  const response = await axiosInstance.delete(API_ENDPOINTS.GENRE_BY_ID(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/** Extrae mensaje de error legible del backend */
export function getGenreErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (data?.title) return data.title;
  return "Error de conexión con el servidor";
}
