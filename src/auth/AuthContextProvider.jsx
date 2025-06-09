import { useState } from "react";
import { AuthContext } from "./Auth.Context";

function getLocalJSON(key, defaultValue) {
  const raw = localStorage.getItem(key);
  if (!raw) return defaultValue;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`⚠️ localStorage key "${key}" no contiene JSON válido:`, e);
    localStorage.removeItem(key);
    return defaultValue;
  }
}

export const AuthContextProvider = ({ children }) => {
  const tokenSaved = getLocalJSON("theFrog-token", "");
  const userSaved = getLocalJSON("theFrog-user", {});

  const [token, setToken] = useState(tokenSaved);
  const [username, setUsername] = useState(userSaved.name || "");

  const handleUserLogin = (newToken, userData) => {

    localStorage.setItem("theFrog-token", JSON.stringify(newToken));
    localStorage.setItem("theFrog-user", JSON.stringify(userData));
    setToken(newToken);
    setUsername(userData.name);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("theFrog-token");
    localStorage.removeItem("theFrog-user");
    setToken("");
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{ token, username, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
