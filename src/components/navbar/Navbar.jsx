import React from "react";
import { House, Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({setSelectedPlatform}) => {

  const handleFilterPlatform = (e) => 
    setSelectedPlatform(e.target.value);
  

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <Link to="/" className="link-button">
            <button>
              <House size={28} className="icon" />
              <span className="logo">TheFrog</span>
            </button>
          </Link>
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar juegos..."
        />

        <div className="navbar-right">
          <Cart size={24} className="icon" />
          <Heart size={24} className="icon" />
          <Link to="/login">
            <button className="nav-button">Mi Cuenta</button>
          </Link>
          <Link to="/register">
            <button className="nav-button primary">Registrarse</button>
          </Link>
        </div>
      </div>

      <div className="navbar-bot">
        <button className="button-console" onClick={handleFilterPlatform} value="PS5">PS5</button>
        <button className="button-console" onClick={handleFilterPlatform} value="PS4">PS4</button>
        <button className="button-console" onClick={handleFilterPlatform} value="Nintendo">Nintendo</button>
        <button className="button-console" onClick={handleFilterPlatform} value="Xbox Series">XBOX Series S|X</button>
        <button className="button-console" onClick={handleFilterPlatform} value="Xbox One">XBOX ONE</button>
        <button className="button-console" onClick={handleFilterPlatform} value="PC">PC</button>
      </div>
    </nav>
  );
};

export default Navbar;
