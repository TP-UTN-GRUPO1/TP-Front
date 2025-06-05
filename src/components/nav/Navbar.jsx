import { useState, useCallback, useContext } from "react";
import { Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import imgLogo from "../../assets/img/theFrogGames1.png";
import axios from "axios";
import PlatformFilters from "../platformFilters/PlatformFilters";
import SearchBar from "../searchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/Auth.Context";
import { useCart } from "../cartContext/CartContext";

const Navbar = ({
  selectedPrice,
  setSelectedPlatform,
  onSelectedPrice,
  hideUserButtons,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { token, handleUserLogout } = useContext(AuthContext);

  const { cart } = useCart();

  const totalProduct = cart.reduce((acc, product) => acc + product.amount, 0);

  const handleFilterPlatform = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const isLoggedIn = Boolean(token);

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
    <nav className={hideUserButtons ? "custom-navbar" : "home-navbar"}>
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
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />
        <div className="navbar-right">
          <Link to="/cart" className="icon-button">
            <span className="counter">{totalProduct} </span>
            <Cart size={24} className="icon" />
          </Link>

          <Heart size={24} className="icon" />

          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <button className="nav-button primary">Panel</button>
              </Link>
              <button
                className="nav-button primary"
                onClick={() => {
                  handleUserLogout();
                  navigate("/");
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="nav-button primary">Iniciar Sesión</button>
            </Link>
          )}
        </div>
      </div>

      {!hideUserButtons && (
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
