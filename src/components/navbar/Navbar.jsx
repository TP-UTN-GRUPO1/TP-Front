import React from "react";
import { House, Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
        <button className="button-console">PS5</button>
        <button className="button-console">PS4</button>
        <button className="button-console">Nintendo</button>
        <button className="button-console">XBOX Series</button>
        <button className="button-console">XBOX ONE</button>
        <button className="button-console">PC</button>
      </div>
    </nav>
  );
};

export default Navbar;
