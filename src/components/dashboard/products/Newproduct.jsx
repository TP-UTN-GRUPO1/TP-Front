import React, { useState } from 'react';
import { toast } from 'react-toastify';

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
    if (!Array.isArray(formData.platforms) || formData.platforms.length === 0) {
      newErrors.platforms = 'Selecciona al menos una plataforma';
    }
    if (!Array.isArray(formData.genres) || formData.genres.length === 0) {
      newErrors.genres = 'Selecciona al menos un género';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'platforms' || name === 'genres') {
      const options = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData({ ...formData, [name]: options });
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Juego creado:', result);
        toast.success('Juego creado exitosamente', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
        console.error('Error:', result.message);
        setErrors({ api: result.message });
        toast.error(result.message || 'Error al crear el juego', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      setErrors({ api: 'Error al conectar con el servidor' });
      toast.error('Error al conectar con el servidor', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <h2>Registrar Juego</h2>
      <div>
        <label htmlFor="nameGame">Nombre del Juego</label>
        <input
          type="text"
          name="nameGame"
          value={formData.nameGame}
          onChange={handleChange}
          placeholder="Ingresa el nombre del juego"
          required
        />
        {errors.nameGame && <p>{errors.nameGame}</p>}
      </div>
      <div>
        <label htmlFor="developer">Desarrollador</label>
        <input
          type="text"
          name="developer"
          value={formData.developer}
          onChange={handleChange}
          placeholder="Ingresa el desarrollador"
          required
        />
        {errors.developer && <p>{errors.developer}</p>}
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Ingresa el rating (0-10)"
          required
        />
        {errors.rating && <p>{errors.rating}</p>}
      </div>
      <div>
        <label htmlFor="imageUrl">URL de la Imagen</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Ingresa la URL de la imagen"
          required
        />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}
      </div>
      <div>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ingresa el precio"
          step="0.01"
          required
        />
        {errors.price && <p>{errors.price}</p>}
      </div>
      <div>
        <label htmlFor="platforms">Plataformas</label>
        <select
          multiple
          name="platforms"
          value={formData.platforms}
          onChange={handleChange}
          required
        >
          {availablePlatforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
        {errors.platforms && <p>{errors.platforms}</p>}
      </div>
      <div>
        <label htmlFor="genres">Géneros</label>
        <select
          multiple
          name="genres"
          value={formData.genres}
          onChange={handleChange}
          required
        >
          {availableGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        {errors.genres && <p>{errors.genres}</p>}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Disponible
        </label>
      </div>
      <button type="button" onClick={handleSubmit}>
        Enviar
      </button>
      {errors.api && <p>{errors.api}</p>}
    </div>
  );
};

export default Newproduct;