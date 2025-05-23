import React, { useState } from 'react';
import { Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { NavDropdown } from "react-bootstrap";
import imgLogo from "../../assets/img/theFrogGames1.png";
import axios from 'axios';

const Navbar = ({
  selectedPrice,
  setSelectedPlatform,
  onSelectedPrice,
  showFilters = true,
  showSearch = true,
  showUserButtons = true,
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleFilterPlatform = (e) => {
    console.log('Plataforma seleccionada:', e.target.value);
    setSelectedPlatform?.(e.target.value);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    console.log('Término de búsqueda actualizado:', event.target.value);
  };

  const handleSearch = async () => {
    console.log('Iniciando búsqueda con query:', query);
    if (query.trim() === '') {
      console.log('Búsqueda vacía, enviando resultados vacíos');
      onSearch?.('', []);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/game?name=${encodeURIComponent(query)}`);
      onSearch?.(query, response.data);
    } catch (error) {
      console.error('Error al traer los datos:', error);
      onSearch?.(query, []);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <Link to="/" className="link-button">
            <button
              onClick={() => onSelectedPrice?.("reset")}
              aria-label="Cargar inicio"
            >
              <img
                src={imgLogo}
                alt="The Frog Games Logo - Redirect to Home"
                className="logo-image"
              />
            </button>
          </Link>
        </div>

        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar juegos..."
              value={query}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="search-button"
              onClick={handleSearch}
              aria-label="Buscar juegos"
            >
              Buscar
            </button>
          </div>
        )}

        {showUserButtons && (
          <div className="navbar-right">
            <Cart size={24} className="icon" />
            <Heart size={24} className="icon" />
            <Link to="/login">
              <button className="nav-button">Iniciar Sesion</button>
            </Link>
            <Link to="/register">
              <button className="nav-button primary">Registrarse</button>
            </Link>
          </div>
        )}
      </div>

      {showFilters && (
        <div className="navbar-bot">
          {[
            "PS5",
            "PS4",
            "Nintendo Switch",
            "Xbox Series",
            "Xbox One",
            "PC",
          ].map((platform) => (
            <button
              key={platform}
              className="button-console"
              onClick={handleFilterPlatform}
              value={platform}
            >
              {platform === "Xbox Series"
                ? "XBOX Series S|X"
                : platform === "Xbox One"
                ? "XBOX ONE"
                : platform}
            </button>
          ))}

          <NavDropdown
            className="button-console"
            menuVariant="dark"
            title={
              selectedPrice === "lowToHigh" ? " Menor-Mayor" : "Ordenar por"
            }
          >
            <NavDropdown.Item
              active={selectedPrice === "lowToHigh"}
              onClick={() => onSelectedPrice?.("lowToHigh")}
            >
              Menor-Mayor
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onSelectedPrice?.("highToLow")}>
              Mayor-Menor
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onSelectedPrice?.("A-Z")}>
              A-Z
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onSelectedPrice?.("Z-A")}>
              Z-A
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => onSelectedPrice?.("reset")}>
              Reiniciar Filtros
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </nav>
  );
};

export default Navbar;