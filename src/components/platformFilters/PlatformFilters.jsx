import { NavDropdown } from "react-bootstrap";
import { SORT_ORDERS } from "../home/Home.consts";
import { ORDER_LABELS } from "./PlatformOrderLabel";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslate } from "../../hooks/useTranslate";

const PlatformFilters = ({ onFilter, selectedOrder, onselectedOrder }) => {
  const translate = useTranslate();

  const [orderLabel, setOrderLabel] = useState("");
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const { data } = await axios.get(
          "https://thefrog-server.onrender.com/platformAndGenres"
        );
        if (data.success) {
          setPlatforms(data.platforms.map((p) => p.platformName));
        }
      } catch (error) {
        console.error("Error al cargar plataformas", error);
      }
    };

    fetchPlatforms();
  }, []);

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

      <NavDropdown
        className="button-console"
        menuVariant="dark"
        title={orderLabel.length === 0 ? translate("Order_By") : orderLabel}
      >
        <NavDropdown.Item
          active={selectedOrder === SORT_ORDERS.LOW_TO_HIGH}
          onClick={() => {
            onselectedOrder(SORT_ORDERS.LOW_TO_HIGH);
            setOrderLabel(translate("Lowest-Highest"));
          }}
        >
          {translate("Lowest-Highest")}
        </NavDropdown.Item>
        <NavDropdown.Item
          active={selectedOrder === SORT_ORDERS.HIGH_TO_LOW}
          onClick={() => {
            onselectedOrder(SORT_ORDERS.HIGH_TO_LOW);
            setOrderLabel(translate("Highest-Lowest"));
          }}
        >
          {translate("Highest-Lowest")}
        </NavDropdown.Item>
        <NavDropdown.Item
          active={selectedOrder === SORT_ORDERS.A_Z}
          onClick={() => {
            onselectedOrder(SORT_ORDERS.A_Z);
            setOrderLabel(ORDER_LABELS[SORT_ORDERS.A_Z]);
          }}
        >
          A-Z
        </NavDropdown.Item>
        <NavDropdown.Item
          active={selectedOrder === SORT_ORDERS.Z_A}
          onClick={() => {
            onselectedOrder(SORT_ORDERS.Z_A);
            setOrderLabel(ORDER_LABELS[SORT_ORDERS.Z_A]);
          }}
        >
          Z-A
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={() => {
            onselectedOrder(SORT_ORDERS.RESET);
            setOrderLabel(translate("Order_By"));
          }}
        >
          {translate("Reset_Filters")}
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default PlatformFilters;
