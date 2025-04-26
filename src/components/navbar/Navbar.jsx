import React from "react";
import { House, Cart, Heart } from "react-bootstrap-icons";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <div className="navBarTop">
        <div className="navbar-left">
          <House size={28} className="icon" />
          <span className="logo">TheFrog</span>
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar juegos..."
        />

        <div className="navbar-right">
          <Cart size={24} className="icon" />
          <Heart size={24} className="icon" />
          <button className="nav-button">Mi Cuenta</button>
          <button className="nav-button primary">Registrarse</button>
        </div>
      </div>
      <div className="navBarBot">
        <button className="button-console">PS5</button>
        <button className="button-console">PS4</button>
        <button className="button-console">Nintendo</button>
        <button className="button-console">XBOX S</button>
        <button className="button-console">XBOX ONE</button>
        <button className="button-console">PC</button>
      </div>
    </nav>
  );
};

export default Navbar;
