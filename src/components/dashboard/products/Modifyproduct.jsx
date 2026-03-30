import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "./ModifyProduct.css";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { useTranslate } from "../../../hooks/useTranslate";
import {
  getAllGames,
  updateGame,
  setGameAvailable,
  setGameNotAvailable,
} from "../../../services/gameService.js";
import { getAllPlatforms } from "../../../services/platformService.js";
import { getAllGenres } from "../../../services/genreService.js";

const ModifyProduct = () => {
  const [games, setGames] = useState([]);
  const [editingProduct, seteditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editPlatforms, setEditPlatforms] = useState([]);
  const [editGenres, setEditGenres] = useState([]);
  const [availablePlatforms, setAvailablePlatforms] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const { token } = useContext(AuthContext);
  const translate = useTranslate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, platformsData, genresData] = await Promise.all([
          getAllGames(),
          getAllPlatforms(),
          getAllGenres(),
        ]);
        setGames(gamesData);
        setAvailablePlatforms(
          Array.isArray(platformsData)
            ? platformsData.map((p) => (typeof p === "string" ? p : p.name))
            : [],
        );
        setAvailableGenres(
          Array.isArray(genresData)
            ? genresData.map((g) => (typeof g === "string" ? g : g.name))
            : [],
        );
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
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
    setEditPlatforms(
      game.platforms?.map((p) =>
        typeof p === "string" ? p : p.platformName || p.name,
      ) || [],
    );
    setEditGenres(
      game.genres?.map((g) =>
        typeof g === "string" ? g : g.genreName || g.name,
      ) || [],
    );
  };

  const handleAddPlatform = (e) => {
    const value = e.target.value;
    if (!value || editPlatforms.includes(value)) return;
    setEditPlatforms([...editPlatforms, value]);
  };

  const handleRemovePlatform = (platform) => {
    setEditPlatforms(editPlatforms.filter((p) => p !== platform));
  };

  const handleAddGenre = (e) => {
    const value = e.target.value;
    if (!value || editGenres.includes(value)) return;
    if (editGenres.length >= 3) {
      toast.warn(`${translate("Warn_select")} 3 genres`, { autoClose: 2000 });
      return;
    }
    setEditGenres([...editGenres, value]);
  };

  const handleRemoveGenre = (genre) => {
    setEditGenres(editGenres.filter((g) => g !== genre));
  };

  const validateEdit = () => {
    const errs = {};
    if (!newTitle.trim()) errs.nameGame = translate("Err_Game_name");
    if (!newPrice || isNaN(newPrice) || Number(newPrice) < 0)
      errs.price = translate("Err_Price");
    if (editPlatforms.length < 1) errs.platforms = translate("Err_Platforms");
    if (editGenres.length < 1 || editGenres.length > 3)
      errs.genres = translate("Err_Genres");
    return errs;
  };

  const handleSavePrice = async (id) => {
    const valErr = validateEdit();
    if (Object.keys(valErr).length) {
      setErrors(valErr);
      return;
    }
    setErrors({});
    const game = games.find((g) => g.id === id);
    try {
      await updateGame(
        id,
        {
          ...game,
          nameGame: newTitle,
          price: parseFloat(newPrice),
          platforms: editPlatforms,
          genres: editGenres,
        },
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
    setEditPlatforms([]);
    setEditGenres([]);
    setErrors({});
  };

  return (
    <div className="modify-container">
      {games.map((game) => (
        <div
          className={`game-card ${editingProduct === game.id ? "editing" : ""}`}
          key={game.id}
        >
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
            <div className="edit-form">
              <input
                type="text"
                placeholder={translate("Insert_title")}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              {errors.nameGame && <p className="error">{errors.nameGame}</p>}
              <input
                placeholder={translate("Insert_Price")}
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              {errors.price && <p className="error">{errors.price}</p>}

              <label>{translate("Platform")}:</label>
              <select onChange={handleAddPlatform} value="">
                <option value="">{translate("Select")}...</option>
                {availablePlatforms
                  .filter((p) => !editPlatforms.includes(p))
                  .map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
              {errors.platforms && <p className="error">{errors.platforms}</p>}
              <div className="chips-container">
                {editPlatforms.map((p) => (
                  <span key={p} className="chip">
                    {p}
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => handleRemovePlatform(p)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <label>{translate("Genre")}:</label>
              <select onChange={handleAddGenre} value="">
                <option value="">{translate("Select")}...</option>
                {availableGenres
                  .filter((g) => !editGenres.includes(g))
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
              {errors.genres && <p className="error">{errors.genres}</p>}
              <div className="chips-container">
                {editGenres.map((g) => (
                  <span key={g} className="chip">
                    {g}
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => handleRemoveGenre(g)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="edit-actions">
                <button onClick={() => handleSavePrice(game.id)}>
                  {translate("Save")}
                </button>
                <button
                  className="buttonModify"
                  onClick={() => {
                    seteditingProduct(null);
                    setErrors({});
                  }}
                >
                  {translate("Cancel")}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="game-tags">
                {game.platforms?.map((p) => {
                  const name =
                    typeof p === "string" ? p : p.platformName || p.name;
                  return (
                    <span key={name} className="tag tag-platform">
                      {name}
                    </span>
                  );
                })}
                {game.genres?.map((g) => {
                  const name =
                    typeof g === "string" ? g : g.genreName || g.name;
                  return (
                    <span key={name} className="tag tag-genre">
                      {name}
                    </span>
                  );
                })}
              </div>
              <button
                className="buttonModify"
                onClick={() => handleEditPrice(game.id)}
              >
                {translate("Edit_Prod")}
              </button>
            </>
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
