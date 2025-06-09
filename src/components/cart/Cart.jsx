import axios from "axios";
import { useCart } from "../cartContext/CartContext";
import CartItem from "../cartItem/CartItem";
import Button from "../button/Button";
import "./Cart.css";

const Cart = () => {
  const { cart, updateAmount, deleteProduct, clearCart } = useCart();

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

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      alert("Tenés que iniciar sesión para finalizar la compra.");
      return;
    }

    const orderData = {
      userId: user.id,
      items: cart.map((p) => ({
        gameId: p.id,
        quantity: p.amount,
        unitPrice: p.price,
      })),
      totalAmount: total,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/orders",
        orderData
      );
      if (response.status === 201) {
        alert("¡Compra realizada con éxito!");
        clearCart();
      } else alert("Ocurrió un error al procesar tu compra.");
    } catch (e) {
      console.error("Error al enviar la orden:", e);
      alert("No se pudo completar la compra.");
    }
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
              onClick={handleCheckout}
              className="checkout-btn"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
