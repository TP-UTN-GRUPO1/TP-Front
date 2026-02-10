import axios from "axios";

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
  needsSpecialChar
) => {
  if (minLength && password.length < minLength) return false;
  else if (maxLength && password.length > maxLength) return false;
  else if (needsUpperCase && !/[A-Z]/.test(password)) return false;
  else if (needsNumber && !/\d/.test(password)) return false;
  else if (needsSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false;

  return true;
};

export const loginUser = async (email, password, onSuccess, onError) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        password,
      }
    );

    const { token, user } = response.data;
    localStorage.setItem("theFrog-token", token);
    localStorage.setItem("user", JSON.stringify(user));

    onSuccess(token, user);
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    if (err.response && err.response.data.message) {
      onError(err.response.data.message);
    } else {
      onError("Error de conexión con el servidor");
    }
  }
};
