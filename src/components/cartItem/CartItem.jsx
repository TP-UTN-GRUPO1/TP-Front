import QuantityControl from "../quantityControl/QuantityControl";
import Button from "../button/Button";
import "./CartItem.css";
import { useTranslate } from "../../hooks/useTranslate";

const CartItem = ({ product, onIncrease, onDecrease, onDelete }) => {
  const totalPrice = product.price * product.amount;
  const translate = useTranslate()

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
        text={translate("Delete")}
        onClick={() => onDelete(product.id)}
        className="delete-btn"
      />
    </li>
  );
};

export default CartItem;
