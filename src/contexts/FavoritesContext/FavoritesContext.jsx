import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const addToFavorites = async (game) => {
    try {
      console.log("GAME COMPLETO:", game);
      console.log("ID QUE ESTOY MANDANDO:", game.id);
      const res = await axios.post(`https://localhost:7256/api/Favorites?gameId=${game.id}`, null, {
  headers: { Authorization: `Bearer ${token}` },
});

      return res.data;
    } catch (err) {
      console.error("Error to add game to favorites", err);
      throw err;
    }
  };

  return (
    <FavoritesContext.Provider value={{ addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
