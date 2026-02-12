import axiosInstance from "../config/axiosInstance.js";
import { API_ENDPOINTS } from "../config/api.config.js";

/**
 * Response DTO: { id: number, name: string }
 * CreateRequest: { name: string }
 * UpdateRequest: { id: number, name: string }
 */

/** Obtener todas las plataformas → PlatformResponse[] */
export async function getAllPlatforms() {
  const response = await axiosInstance.get(API_ENDPOINTS.PLATFORMS);
  return response.data;
}

/** Crear una plataforma (Admin/SysAdmin) */
export async function createPlatform(name, token) {
  const response = await axiosInstance.post(
    API_ENDPOINTS.PLATFORMS,
    { name: name.trim() },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

/** Actualizar una plataforma (Admin) */
export async function updatePlatform(id, name, token) {
  const response = await axiosInstance.put(
    API_ENDPOINTS.PLATFORMS,
    { id, name: name.trim() },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

/** Eliminar una plataforma (Admin) */
export async function deletePlatform(id, token) {
  const response = await axiosInstance.delete(
    API_ENDPOINTS.PLATFORM_BY_ID(id),
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

/** Extrae mensaje de error legible del backend */
export function getErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (data?.title) return data.title;
  return "Error de conexión con el servidor";
}
