import { Button } from "react-bootstrap";
import "./QuantityControl.css";

const QuantityControl = ({ amount, onIncrease, onDecrease }) => (
  <div className="quantity-control">
    <Button onClick={onDecrease} disabled={amount <= 1}>
      -
    </Button>
    <span className="item-amount">{amount}</span>
    <Button onClick={onIncrease}>+</Button>
    
  </div>
);

export default QuantityControl;
