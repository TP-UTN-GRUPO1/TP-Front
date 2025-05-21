import { Cart, Heart } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { DropdownMenu, NavDropdown } from "react-bootstrap";
import imgLogo from "../../assets/img/theFrogGames1.png";

const Navbar = ({ setSelectedPlatform, setSelectedPrice }) => {
  const handleFilterPlatform = (e) => setSelectedPlatform(e.target.value);

  return (
    <nav className="custom-navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <Link to="/" className="link-button">
            <button
              onClick={() => setSelectedPrice("reset")}
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
        <button
          className="button-console"
          onClick={handleFilterPlatform}
          value="PS5"
        >
          PS5
        </button>
        <button
          className="button-console"
          onClick={handleFilterPlatform}
          value="PS4"
        >
          PS4
        </button>
        <button
          className="button-console"
          onClick={handleFilterPlatform}
          value="Nintendo Switch"
        >
          Nintendo
        </button>
        <button
          className="button-console"
          onClick={handleFilterPlatform}
          value="Xbox Series"
        >
          XBOX Series S|X
        </button>
        <button
          className="button-console"
          onClick={handleFilterPlatform}
          value="Xbox One"
        >
          XBOX ONE
        </button>
        <button
          className="button-console"
          onClick={handleFilterPlatform}
          value="PC"
        >
          PC
        </button>
        <NavDropdown
          className="button-console"
          menuVariant="dark"
          title="Ordenar por"
        >
          <NavDropdown.Item onClick={() => setSelectedPrice("lowToHigh")}>
            Precio Menor-Mayor
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setSelectedPrice("highToLow")}>
            Precio Mayor-Menor
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setSelectedPrice("A-Z")}>
            A-Z
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setSelectedPrice("Z-A")}>
            Z-A
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => setSelectedPrice("reset")}>
            Reiniciar Filtros{" "}
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
};

export default Navbar;
