import { NavDropdown } from "react-bootstrap";
import { SORT_ORDERS } from "../home/Home.consts";

const PlatformFilters = ({ onFilter, selectedPrice, onSelectedPrice }) => {
  const platforms = [
    "PS5",
    "PS4",
    "Nintendo Switch",
    "Xbox Series",
    "Xbox One",
    "PC",
  ];

  return (
    <div className="navbar-bot">
      {platforms.map((platform) => (
        <button
          key={platform}
          className="button-console"
          onClick={(e) => onFilter(e)}
          value={platform}
        >
          {platform === "Xbox Series"
            ? "XBOX Series S|X"
            : platform === "Xbox One"
            ? "XBOX ONE"
            : platform}
        </button>
      ))}

      <NavDropdown className="button-console" menuVariant="dark">
        <NavDropdown.Item
          active={selectedPrice === SORT_ORDERS.LOW_TO_HIGH}
          onClick={() => onSelectedPrice(SORT_ORDERS.LOW_TO_HIGH)}
        >
          Menor-Mayor
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => onSelectedPrice(SORT_ORDERS.HIGH_TO_LOW)}
        >
          Mayor-Menor
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => onSelectedPrice(SORT_ORDERS.A_Z)}>
          A-Z
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => onSelectedPrice(SORT_ORDERS.Z_A)}>
          Z-A
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => onSelectedPrice(SORT_ORDERS.RESET)}>
          Reiniciar Filtros
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default PlatformFilters;
