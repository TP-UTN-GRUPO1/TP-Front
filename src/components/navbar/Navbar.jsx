import { useState } from "react";
import { Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { NavDropdown } from "react-bootstrap";
import imgLogo from "../../assets/img/theFrogGames1.png";
import axios from "axios";
import { SORT_ORDERS } from "../home/Home.consts";


const Navbar = ({
  selectedPrice,
  setSelectedPlatform,
  onSelectedPrice,
  showFilters = true,
  showSearch = true,
  showUserButtons = true,
  onSearch,
  setOriginalGames,
}) => {
  const [query, setQuery] = useState("");
  

  const handleFilterPlatform = (e) => {
    console.log("Plataforma seleccionada:", e.target.value);
    setSelectedPlatform?.(e.target.value);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    console.log("Término de búsqueda actualizado:", event.target.value);
  };

  const handleSearch = async () => {
    console.log("Iniciando búsqueda con query:", query);
    if (query.trim() === "") {
      console.log("Búsqueda vacía, enviando resultados vacíos");
      onSearch?.("", []);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/game?name=${encodeURIComponent(query)}`
      );
      onSearch?.(query, response.data);
    } catch (error) {
      console.error("Error al traer los datos:", error);
      onSearch?.(query, []);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <button onClick={() => setOriginalGames} aria-label="Cargar inicio">
            <img
              src={imgLogo}
              alt="The Frog Games Logo - Redirect to Home"
              className="logo-image"
            />
          </button>
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
          </div>
        )}

        {showUserButtons && (
          <div className="navbar-right">
            <Cart size={24} className="icon" />
            <Heart size={24} className="icon" />
            <Link to="/dashboard">
              <button className="nav-button primary">Panel</button>
            </Link>
            <Link to="/login">
              <button className="nav-button primary">Iniciar Sesion</button>
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
              onClick={() => onSelectedPrice?.(SORT_ORDERS.LOW_TO_HIGH)}
            >
              Menor-Mayor
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onSelectedPrice?.(SORT_ORDERS.HIGH_TO_LOW) }>
              Mayor-Menor
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onSelectedPrice?.(SORT_ORDERS.A_Z)}>
              A-Z
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onSelectedPrice?.(SORT_ORDERS.Z_A)}>
              Z-A
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => onSelectedPrice?.(SORT_ORDERS.RESET)}>
              Reiniciar Filtros
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


