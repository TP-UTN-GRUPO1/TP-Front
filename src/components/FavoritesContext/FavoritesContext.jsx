import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/Auth.Context";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;

  const addToFavorites = async (game) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/favorites",
        {
          idUser: userId,
          gameId: game.id,
          gameName: game.gameName,
          imageUrl: game.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
