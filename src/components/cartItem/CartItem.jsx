import QuantityControl from "../quantityControl/QuantityControl";
import Button from "../button/Button";
import "./CartItem.css";

const CartItem = ({ product, onIncrease, onDecrease, onDelete }) => {
  const totalPrice = product.price * product.amount;

  return (
    <li className="cart-item">
      <div className="product-info">
        <img src={product.img} alt={product.name} className="product-image" />
        <span className="product-name">{product.name}</span>
      </div>
      <span>${product.price.toFixed(2)}</span>
      <QuantityControl
        amount={product.amount}
        onIncrease={() => onIncrease(product.id)}
        onDecrease={() => onDecrease(product.id)}
      />
      <span>${totalPrice.toFixed(2)}</span>
      <Button
        text="Eliminar"
        onClick={() => onDelete(product.id)}
        className="delete-btn"
      />
    </li>
  );
};

export default CartItem;
