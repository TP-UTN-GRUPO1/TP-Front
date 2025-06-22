import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Newproduct.css";
import { useTranslate } from "../../../hooks/useTranslate";

const Newproduct = () => {
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
  const availablePlatforms = [
    "PC",
    "PS4",
    "PS5",
    "Xbox One",
    "Xbox Series",
    "Nintendo Switch",
  ];
  const availableGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Sports",
    "Fighting",
    "Racing",
    "Strategy",
    "Puzzle",
    "Platformer",
    "Simulation",
    "Horror",
    "Stealth",
    "Music",
    "Party",
    "Sandbox",
    "Survival",
  ];

  const validateForm = () => {
    const errs = {};
    if (!formData.nameGame) errs.nameGame = "Ingrese un nombre";
    if (!formData.developer)
      errs.developer = "Ingrese el nombre de la desarrolladora";
    if (
      !formData.rating ||
      isNaN(formData.rating) ||
      formData.rating < 0 ||
      formData.rating > 10
    ) {
      errs.rating = "El rating debe ser un número entre 0 y 10";
    }
    if (!formData.imageUrl) errs.imageUrl = "La URL de la imagen es requerida";
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      errs.price = "El precio debe ser un número mayor o igual a 0";
    }
    if (formData.platforms.length < 1)
      errs.platforms = "Selecciona al menos una plataforma";
    if (formData.genres.length < 1 || formData.genres.length > 3) {
      errs.genres = "Selecciona entre 1 y 3 géneros";
    }
    return errs;
  };

  const handleSelect = (e, group, limit = Infinity) => {
    const value = e.target.value;
    if (!value) return;
    const list = formData[group];
    if (list.includes(value)) return;
    if (list.length >= limit) {
      toast.warn(`Solo puedes seleccionar hasta ${limit} ${group}`, {
        autoClose: 2000,
      });
      return;
    }
    setFormData({ ...formData, [group]: [...list, value] });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "available") {
      setFormData({ ...formData, available: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    try {
      const token = localStorage.getItem("theFrog-token");
      const resp = await fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await resp.json();
      if (resp.ok) {
        toast.success("Juego creado exitosamente");
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
      } else {
        setErrors({ api: result.message });
        toast.error(result.message || "Error al crear el juego");
      }
    } catch {
      setErrors({ api: "Error al conectar con el servidor" });
      toast.error("Error al conectar con el servidor");
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
        <label className="availableCheckbox">
          <span>{translate("Available")}</span>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={handleSubmit}>
          {translate("Save")}
        </button>
        {errors.api && <p className="error">{errors.api}</p>}
      </div>

      <div className="summary-card">
        <h4>{translate("Platform_select")}</h4>
        <div className="chip-container">
          {formData.platforms.map((p) => (
            <span key={p} className="chip">
              {p}{" "}
              <button onClick={() => handleDelete("platforms", p)}>×</button>
            </span>
          ))}
        </div>

        <h4>{translate("Genre_select")}</h4>
        <div className="chip-container">
          {formData.genres.map((g) => (
            <span key={g} className="chip">
              {g} <button onClick={() => handleDelete("genres", g)}>×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newproduct;
