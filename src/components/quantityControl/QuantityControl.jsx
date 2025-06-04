import "./QuantityControl.css";

const QuantityControl = ({ amount, onIncrease, onDecrease }) => (
  <div className="quantity-control">
    <button onClick={onDecrease} disabled={amount <= 1}>
      -
    </button>
    <span>{amount}</span>
    <button onClick={onIncrease}>+</button>
  </div>
);

export default QuantityControl;
