import React, { useState, useEffect, useContext } from "react";
import "./ModifyProduct.css";
import { AuthContext } from "../../../auth/Auth.Context";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, okAlert, errorAlert } from "../../../utils/SweetAlert";

const ModifyProduct = () => {
  const [games, setGames] = useState([]);
  const [editingProduct, seteditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { token } = useContext(AuthContext);
  const translate = useTranslate();
  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  const handleToggleAvailability = (id) => {
    const game = games.find((g) => g.id === id);
    fetch(`http://localhost:3000/updateGame/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nameGame: game.nameGame,
        price: game.price,
        developer: game.developer,
        rating: game.rating,
        genres: game.genres.map((g) => g.genreName),
        platforms: game.platforms.map((p) => p.platformName),
        available: !game.available,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error: " + response.status);
        return fetch("http://localhost:3000/games");
      })
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleEditPrice = (id) => {
    const game = games.find((g) => g.id === id);
    seteditingProduct(id);
    setNewPrice(game.price);
    setNewTitle(game.nameGame);
  };

  const handleSavePrice = (id) => {
    const game = games.find((g) => g.id === id);
    fetch(`http://localhost:3000/updateGame/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nameGame: newTitle,
        price: parseFloat(newPrice),
        developer: game.developer,
        rating: game.rating,
        genres: game.genres.map((g) => g.genreName),
        platforms: game.platforms.map((p) => p.platformName),
        available: game.available,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error: " + response.status);
        return fetch("http://localhost:3000/games");
      })
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error:", error));
    seteditingProduct(null);
    setNewPrice("");
    setNewTitle("");
  };

  const handleDeleteGame = async (id) => {
    const confirmed = await confirmDialog({
      title: translate("Confirm_Delete"),
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Delete"),
      cancelButtonText: translate("Cancel"),
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/games/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      setGames((prev) => prev.filter((g) => g.id !== id));
      okAlert({
        title: translate("Deleted"),
        text: translate("Game_deleted"),
      });
    } catch (err) {
      console.error("Error:", err);
      errorAlert({
        title: translate("Error"),
        text: translate("Delete_failed"),
      });
    }
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
          <button
            className="buttonModify"
            onClick={() => handleDeleteGame(game.id)}
          >
            {translate("Delete")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ModifyProduct;
