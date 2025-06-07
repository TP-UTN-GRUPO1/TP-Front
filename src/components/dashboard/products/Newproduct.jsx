import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Newproduct.css';

const Newproduct = () => {
  const [formData, setFormData] = useState({
    nameGame: '',
    developer: '',
    rating: '',
    imageUrl: '',
    available: true,
    price: '',
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({});

  const availablePlatforms = ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series', 'Nintendo Switch'];
  const availableGenres = [
    'Action', 'Adventure', 'RPG', 'Shooter', 'Sports', 'Fighting',
    'Racing', 'Strategy', 'Puzzle', 'Platformer', 'Simulation',
    'Horror', 'Stealth', 'Music', 'Party', 'Sandbox', 'Survival'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameGame) newErrors.nameGame = 'Ingrese un nombre';
    if (!formData.developer) newErrors.developer = 'Ingrese el nombre de la desarrolladora';
    if (!formData.rating || isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'El rating debe ser un número entre 0 y 10';
    }
    if (!formData.imageUrl) newErrors.imageUrl = 'La URL de la imagen es requerida';
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      newErrors.price = 'El precio debe ser un número mayor o igual a 0';
    }
    if (formData.platforms.length < 1) {
      newErrors.platforms = 'Selecciona al menos una plataforma';
    }
    if (formData.genres.length < 1 || formData.genres.length > 3) {
      newErrors.genres = 'Selecciona entre 1 y 3 géneros';
    }
    return newErrors;
  };

  const handleCheckboxChange = (e, group) => {
    const { value, checked } = e.target;
    const currentValues = formData[group];

    if (checked) {
      if (group === 'genres' && currentValues.length >= 3) {
        toast.warn('Solo puedes seleccionar hasta 3 géneros', { autoClose: 2000 });
        return;
      }
      setFormData({
        ...formData,
        [group]: [...currentValues, value],
      });
    } else {
      setFormData({
        ...formData,
        [group]: currentValues.filter((item) => item !== value),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'available') {
      setFormData({ ...formData, available: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Juego creado exitosamente');
        setFormData({
          nameGame: '',
          developer: '',
          rating: '',
          imageUrl: '',
          available: true,
          price: '',
          platforms: [],
          genres: [],
        });
      } else {
        setErrors({ api: result.message });
        toast.error(result.message || 'Error al crear el juego');
      }
    } catch {
      setErrors({ api: 'Error al conectar con el servidor' });
      toast.error('Error al conectar con el servidor');
    }
  };

  const handleDelete = (type, value) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((item) => item !== value),
    });
  };

  return (
    <div className="form-container">
      <div className="game-card">
        <h3>Registrar Nuevo Juego</h3>

        <input type="text" name="nameGame" placeholder="Nombre del Juego" value={formData.nameGame} onChange={handleChange} />
        {errors.nameGame && <p>{errors.nameGame}</p>}

        <input type="text" name="developer" placeholder="Desarrollador" value={formData.developer} onChange={handleChange} />
        {errors.developer && <p>{errors.developer}</p>}

        <input type="number" name="rating" placeholder="Rating (0-10)" value={formData.rating} onChange={handleChange} />
        {errors.rating && <p>{errors.rating}</p>}

        <input type="url" name="imageUrl" placeholder="URL de la imagen" value={formData.imageUrl} onChange={handleChange} />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}

        <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
        {errors.price && <p>{errors.price}</p>}

        <label>Plataformas (mínimo 1)</label>
        {availablePlatforms.map((p) => (
          <div key={p}>
            <input
              type="checkbox"
              value={p}
              checked={formData.platforms.includes(p)}
              onChange={(e) => handleCheckboxChange(e, 'platforms')}
            />
            <span>{p}</span>
          </div>
        ))}
        {errors.platforms && <p>{errors.platforms}</p>}

        <label>Géneros (1 a 3)</label>
        {availableGenres.map((g) => (
          <div key={g}>
            <input
              type="checkbox"
              value={g}
              checked={formData.genres.includes(g)}
              onChange={(e) => handleCheckboxChange(e, 'genres')}
            />
            <span>{g}</span>
          </div>
        ))}
        {errors.genres && <p>{errors.genres}</p>}

        <label>
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          Disponible
        </label>

        <button type="button" onClick={handleSubmit}>Guardar</button>
        {errors.api && <p>{errors.api}</p>}
      </div>

      <div className="summary-card">
        <h4>Plataformas Seleccionadas</h4>
        <div className="block-list">
          {formData.platforms.map((p, i) => (
            <div key={i} className="block-item">
              {p}
              <button className="butonX" onClick={() => handleDelete('platforms', p)}>❌</button>
            </div>
          ))}
        </div>

        <h4>Géneros Seleccionados</h4>
        <div className="block-list">
          {formData.genres.map((g, i) => (
            <div key={i} className="block-item">
              {g}
              <button className="butonX" onClick={() => handleDelete('genres', g)}>❌</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newproduct;
