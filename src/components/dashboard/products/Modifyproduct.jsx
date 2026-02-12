import React, { useState, useEffect, useContext } from "react";
import "./ModifyProduct.css";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { useTranslate } from "../../../hooks/useTranslate";
// import { confirmDialog, okAlert, errorAlert } from "../../../utils/SweetAlert";
import {
  getAllGames,
  updateGame,
  setGameAvailable,
  setGameNotAvailable,
} from "../../../services/gameService.js";

const ModifyProduct = () => {
  const [games, setGames] = useState([]);
  const [editingProduct, seteditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { token } = useContext(AuthContext);
  const translate = useTranslate();
  useEffect(() => {
    getAllGames()
      .then((data) => setGames(data))
      .catch((error) => console.error("Error al cargar juegos:", error));
  }, []);

  const handleToggleAvailability = async (id) => {
    const game = games.find((g) => g.id === id);
    try {
      if (game.available) {
        await setGameNotAvailable(id, token);
      } else {
        await setGameAvailable(id, token);
      }
      const data = await getAllGames();
      setGames(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditPrice = (id) => {
    const game = games.find((g) => g.id === id);
    seteditingProduct(id);
    setNewPrice(game.price);
    setNewTitle(game.nameGame);
  };

  const handleSavePrice = async (id) => {
    const game = games.find((g) => g.id === id);
    try {
      await updateGame(
        id,
        { ...game, nameGame: newTitle, price: parseFloat(newPrice) },
        token,
      );
      const data = await getAllGames();
      setGames(data);
    } catch (error) {
      console.error("Error:", error);
    }
    seteditingProduct(null);
    setNewPrice("");
    setNewTitle("");
  };

  return (
    <div className="modify-container">
      {games.map((game) => (
        <div className="game-card" key={game.id}>
          <h3>{game.nameGame}</h3>
          <p>
            {translate("Price")}: ${game.price}
          </p>
          <p
            className={`status ${game.available ? "available" : "unavailable"}`}
          >
            {game.available ? translate("Available") : translate("Hidden")}
          </p>

          {editingProduct === game.id ? (
            <div>
              <input
                type="text"
                placeholder={translate("Insert_title")}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                placeholder={translate("Insert_Price")}
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button onClick={() => handleSavePrice(game.id)}>
                {translate("Save")}
              </button>
              <button
                className="buttonModify"
                onClick={() => {
                  seteditingProduct(null);
                }}
              >
                {translate("Cancel")}
              </button>
            </div>
          ) : (
            <button
              className="buttonModify"
              onClick={() => handleEditPrice(game.id)}
            >
              {translate("Edit_Prod")}
            </button>
          )}

          <button
            className="buttonModify"
            onClick={() => handleToggleAvailability(game.id)}
          >
            {game.available ? translate("Hide") : translate("Show")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ModifyProduct;
