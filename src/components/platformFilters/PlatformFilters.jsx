import { NavDropdown } from "react-bootstrap";
import { SORT_ORDERS } from "../home/Home.consts";
import { ORDER_LABELS } from "./PlatformOrderLabel";
import { useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";

const PlatformFilters = ({ onFilter, selectedOrder, onselectedOrder }) => {
  const translate = useTranslate();
  
  const [orderLabel, setOrderLabel] = useState(translate("Order_By"));
  
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
      {/* cambiar title por una funcion */}
      <NavDropdown className="button-console" menuVariant="dark" title={orderLabel}>
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
          setOrderLabel(ORDER_LABELS[SORT_ORDERS.A_Z])
          }}>
          A-Z
        </NavDropdown.Item>
        <NavDropdown.Item 
        active={selectedOrder === SORT_ORDERS.Z_A}
        onClick={() => {
          onselectedOrder(SORT_ORDERS.Z_A);
          setOrderLabel(ORDER_LABELS[SORT_ORDERS.Z_A])
          }}>
          Z-A
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() =>{
          onselectedOrder(SORT_ORDERS.RESET);
           setOrderLabel(translate("Order_By"));
          }}>
         {translate("Reset_Filters")}
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default PlatformFilters;
