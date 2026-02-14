import { useState } from "react";
import { AuthContext } from "./AuthContext";

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
  const tokenSaved = localStorage.getItem("theFrog-token");
  const userSaved = getLocalJSON("theFrog-user", {});
  const roleSaved = getLocalJSON("roleUser", null);

  const [token, setToken] = useState(tokenSaved);
  const [name, setName] = useState(
    userSaved.name || userSaved.email?.split("@")[0] || "",
  );
  const [userRole, setUserRole] = useState(roleSaved);

  const handleUserLogin = (newToken, userData) => {
    localStorage.setItem("roleUser", JSON.stringify(userData.roleId));
    localStorage.setItem("theFrog-token", newToken);
    localStorage.setItem("theFrog-user", JSON.stringify(userData));
    setToken(newToken);
    setName(userData.name || userData.email?.split("@")[0] || "");
    setUserRole(userData.roleId);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("theFrog-token");
    localStorage.removeItem("theFrog-user");
    setToken("");
    setName("");
  };

  return (
    <AuthContext.Provider
      value={{ token, name, userRole, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
