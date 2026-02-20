import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Newproduct.css";
import { createGame } from "../../../services/gameService.js";
import { getAllPlatforms } from "../../../services/platformService.js";
import { getAllGenres } from "../../../services/genreService.js";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, okAlert, errorAlert } from "../../../utils/SweetAlert";

const Newproduct = () => {
  const [availablePlatforms, setAvailablePlatforms] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [formData, setFormData] = useState({
    nameGame: "",
    developer: "",
    rating: "",
    imageUrl: "",
    available: true,
    price: "",
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({});
  const translate = useTranslate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [platformsData, genresData] = await Promise.all([
          getAllPlatforms(),
          getAllGenres(),
        ]);
        const platformsList = Array.isArray(platformsData)
          ? platformsData.map((p) => (typeof p === "string" ? p : p.name))
          : [];
        const genresList = Array.isArray(genresData)
          ? genresData.map((g) => (typeof g === "string" ? g : g.name))
          : [];
        setAvailablePlatforms(platformsList);
        setAvailableGenres(genresList);
      } catch (error) {
        console.error("Error al cargar plataformas y géneros", error);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!formData.nameGame) errs.nameGame = translate("Err_Game_name");
    if (!formData.developer)
      errs.developer = translate("Err_Developer");
    if (
      !formData.rating ||
      isNaN(formData.rating) ||
      formData.rating < 0 ||
      formData.rating > 10
    ) {
      errs.rating = translate("Err_Rating");
    }
    if (!formData.imageUrl) errs.imageUrl = translate("Err_Img_URL");
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      errs.price = translate("Err_Price");
    }
    if (formData.platforms.length < 1)
      errs.platforms = translate("Err_Platforms");
    if (formData.genres.length < 1 || formData.genres.length > 3) {
      errs.genres = translate("Err_Genres");
    }
    return errs;
  };

  const handleSelect = (e, group, limit = Infinity) => {
    const value = e.target.value;
    if (!value) return;
    const list = formData[group];
    if (list.includes(value)) return;
    if (list.length >= limit) {
      toast.warn(`${translate("Warn_select")} ${limit} ${group}`, {
        autoClose: 2000,
      });
      return;
    }
    setFormData({ ...formData, [group]: [...list, value] });
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDelete = (group, value) => {
    setFormData({
      ...formData,
      [group]: formData[group].filter((x) => x !== value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErr = validateForm();
    if (Object.keys(valErr).length) {
      setErrors(valErr);
      return;
    }
    setErrors({});

    // Confirmación antes de crear
    const confirmed = await confirmDialog({
      title: translate("Confirm_create_game"),
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Confirm"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) {
      toast.info(translate("Create_cancelled"), { autoClose: 2000 });
      return;
    }

    try {
      const token = localStorage.getItem("theFrog-token");
      await createGame(formData, token);
      toast.success(translate("Game_Created"), { autoClose: 3000 });
      okAlert({
        title: translate("Confirmed"),
        text: translate("Game_Created"),
      });
      setFormData({
        nameGame: "",
        developer: "",
        rating: "",
        imageUrl: "",
        available: true,
        price: "",
        platforms: [],
        genres: [],
      });
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        "Error al conectar con el servidor";
      setErrors({
        api: typeof msg === "string" ? msg : "Error al crear el juego",
      });
      toast.error(translate("Error_server"), { autoClose: 3000 });
      errorAlert({
        title: translate("Error_creating_game"),
        text: typeof msg === "string" ? msg : translate("Error_server"),
      });
    }
  };

  return (
    <div className="form-container">
      <div className="game-card">
        <h3>{translate("Register_product")}</h3>

        <input
          className="newInput"
          type="text"
          name="nameGame"
          placeholder={translate("Name_Game")}
          value={formData.nameGame}
          onChange={handleChange}
        />
        {errors.nameGame && <p className="error">{errors.nameGame}</p>}

        <input
          className="newInput"
          type="text"
          name="developer"
          placeholder={translate("Developer")}
          value={formData.developer}
          onChange={handleChange}
        />
        {errors.developer && <p className="error">{errors.developer}</p>}

        <input
          className="newInput"
          type="number"
          name="rating"
          placeholder="Rating (0-10)"
          value={formData.rating}
          onChange={handleChange}
        />
        {errors.rating && <p className="error">{errors.rating}</p>}

        <input
          className="newInput"
          type="url"
          name="imageUrl"
          placeholder={translate("Img_URL")}
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

        <input
          className="newInput"
          type="number"
          name="price"
          placeholder={translate("Price")}
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <label>{translate("Platform")}:</label>
        <select
          onChange={(e) => handleSelect(e, "platforms", Infinity)}
          value=""
        >
          <option value="">{translate("Select")}...</option>
          {availablePlatforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.platforms && <p className="error">{errors.platforms}</p>}

        <label>{translate("Genre")}:</label>
        <select onChange={(e) => handleSelect(e, "genres", 3)} value="">
          <option value="">{translate("Select")}...</option>
          {availableGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genres && <p className="error">{errors.genres}</p>}

        <button type="button" onClick={handleSubmit}>
          {translate("Save")}
        </button>
        {errors.api && <p className="error">{errors.api}</p>}
      </div>

      <div className="summary-card">
        <h4>{translate("Platform_select")}</h4>
        <div className="itemX">
          {formData.platforms.map((p) => (
            <span key={p} className="chip">
              {p}{" "}
              <button
                className="buttonCancel"
                onClick={() => handleDelete("platforms", p)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <h4>{translate("Genre_select")}</h4>
        <div className="itemX">
          {formData.genres.map((g) => (
            <span key={g} className="chip">
              {g}{" "}
              <button
                className="buttonCancel"
                onClick={() => handleDelete("genres", g)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newproduct;
