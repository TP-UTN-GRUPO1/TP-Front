import { useState } from "react";
import { AuthContext } from "./Auth.Context";

const tokenSaved = localStorage.getItem("theFrog-token");

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenSaved);

  const handleUserLogin = (newToken, id) => {
    localStorage.setItem("theFrog-token", JSON.stringify(newToken));
    setToken(newToken);

    // localStorage.setItem("userId", id)
  };

  const handleUserLogout = () => {
    localStorage.removeItem("theFrog-token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
