import axiosInstance from "../../../config/axiosInstance.js";
import { API_ENDPOINTS } from "../../../config/api.config.js";

export const validateString = (str, minLength, maxLength) => {
  if (minLength && str.length < minLength) return false;
  else if (maxLength && str.length > maxLength) return false;

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password,
  minLength,
  maxLength,
  needsUpperCase,
  needsNumber,
  needsSpecialChar,
) => {
  if (minLength && password.length < minLength) return false;
  else if (maxLength && password.length > maxLength) return false;
  else if (needsUpperCase && !/[A-Z]/.test(password)) return false;
  else if (needsNumber && !/\d/.test(password)) return false;
  else if (needsSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false;

  return true;
};

// Mapeo de nombre de rol (string) a ID numérico
const ROLE_MAP = {
  admin: 1,
  user: 2,
  sysadmin: 3,
};

function resolveRoleId(rawRole) {
  if (rawRole == null) return null;
  // Si ya es un número o string numérico
  const num = parseInt(rawRole, 10);
  if (!isNaN(num)) return num;
  // Si es un nombre de rol (string)
  const mapped = ROLE_MAP[String(rawRole).toLowerCase()];
  return mapped ?? null;
}

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    const email =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      "";

    const rawRole =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      decoded["role"] ??
      decoded["Role"] ??
      decoded["roleId"] ??
      undefined;

    const roleId = resolveRoleId(rawRole);
    console.log("🔑 Role:", rawRole, "→", roleId);

    return {
      id: decoded.idUser ?? decoded.IdUser ?? decoded.id ?? decoded.Id,
      email,
      name: decoded.userName || decoded.UserName || email.split("@")[0] || "",
      roleId,
    };
  } catch (e) {
    console.error("Error al decodificar JWT:", e);
    return null;
  }
}

export const loginUser = async (email, password, onSuccess, onError) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    const token = response.data;
    const userData = decodeJWT(token);

    if (!userData) {
      onError("Error al procesar los datos del usuario");
      return;
    }

    localStorage.setItem("theFrog-token", token);
    localStorage.setItem("theFrog-user", JSON.stringify(userData));

    onSuccess(token, userData);
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    if (err.response && err.response.data) {
      onError(
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.data.message || "Credenciales inválidas",
      );
    } else {
      onError("Error de conexión con el servidor");
    }
  }
};
