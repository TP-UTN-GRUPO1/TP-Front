import { useState, useCallback } from "react";
import { Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import imgLogo from "../../assets/img/theFrogGames1.png";
import axios from "axios";
import PlatformFilters from "../platformFilters/PlatformFilters";
import SearchBar from "../searchBar/SearchBar";

const Navbar = ({
  selectedPrice,
  setSelectedPlatform,
  onSelectedPrice,
  showFilters = true,
  showSearch = true,
  showUserButtons = true,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleFilterPlatform = (e) => {
    setSelectedPlatform?.(e.target.value);
  };

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") {
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
  }, [query, onSearch]);

  return (
    <nav className="custom-navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <a href="/" aria-label="Cargar inicio">
            <img
              src={imgLogo}
              alt="The Frog Games Logo - Redirect to Home"
              className="logo-image"
            />
          </a>
        </div>

        {showSearch && (
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
          />
        )}

        {showUserButtons && (
          <div className="navbar-right">
            <Link to="/cart" className="icon-button">
              <Cart size={24} className="icon" />
            </Link>
            
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
        <PlatformFilters
          onFilter={handleFilterPlatform}
          selectedPrice={selectedPrice}
          onSelectedPrice={onSelectedPrice}
        />
      )}
    </nav>
  );
};

export default Navbar;
