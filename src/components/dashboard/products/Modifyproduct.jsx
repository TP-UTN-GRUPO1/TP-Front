import React, { useState, useEffect } from "react";
import "./ModifyProduct.css";

const ModifyProduct = () => {
  const [games, setGames] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  const handleToggleAvailability = (id) => {
    const game = games.find((g) => g.id === id);
    fetch(`http://localhost:3000/updateGame/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
    setEditingPrice(id);
    setNewPrice(game.price);
  };

  const handleSavePrice = (id) => {
    const game = games.find((g) => g.id === id);
    fetch(`http://localhost:3000/updateGame/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameGame: game.nameGame,
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
    setEditingPrice(null);
    setNewPrice("");
  };

  return (
    <div className="modify-container">
      {games.map((game) => (
        <div className="game-card" key={game.id}>
          <h3>{game.nameGame}</h3>
          <p>Precio: ${game.price}</p>
          <p
            className={`status ${game.available ? "available" : "unavailable"}`}
          >
            {game.available ? "Disponible" : "Oculto"}
          </p>

          {editingPrice === game.id ? (
            <div>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button onClick={() => handleSavePrice(game.id)}>Guardar</button>
              <button onClick={() => setEditingPrice(null)}>Cancelar</button>
            </div>
          ) : (
            <button onClick={() => handleEditPrice(game.id)}>
              Editar Precio
            </button>
          )}

          <button onClick={() => handleToggleAvailability(game.id)}>
            {game.available ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ModifyProduct;
