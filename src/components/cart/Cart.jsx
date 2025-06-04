import { useCart } from "../cartContext/CartContext";
import CartItem from "../cartItem/CartItem";
import Button from "../button/Button";
import "./Cart.css";

const Cart = () => {
  const { cart, updateAmount, deleteProduct } = useCart();

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.amount,
    0
  );

  const handleIncreaseAmount = (productId) => {
    updateAmount(productId, 1);
  };

  const handleDecreaseAmount = (productId) => {
    updateAmount(productId, -1);
  };

  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-header">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Total</span>
            <span>Eliminar producto</span>
          </div>
          <ul className="cart-items">
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onIncrease={handleIncreaseAmount}
                onDecrease={handleDecreaseAmount}
                onDelete={deleteProduct}
              />
            ))}
          </ul>
          <div className="cart-summary">
            <p className="total">Total a pagar: ${total.toFixed(2)}</p>
            <Button
              text="Pagar"
              onClick={() => alert("Procediendo al pago")}
              className="checkout-btn"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
