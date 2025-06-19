import axios from "axios";
import { useCart } from "../cartContext/CartContext";
import CartItem from "../cartItem/CartItem";
import Button from "../button/Button";
import "./Cart.css";
import { errorToast, successToast } from "../../utils/notification";
import { useTranslate } from "../../hooks/useTranslate";

const Cart = () => {
  const { cart, updateAmount, deleteProduct, clearCart } = useCart();
  const translate =useTranslate();
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
      errorToast("Tenés que iniciar sesión para finalizar la compra.");
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
        successToast(translate("Purchase_successfully"));
        clearCart();
      } else alert("Ocurrió un error al procesar tu compra.");
    } catch (e) {
      console.error("Error al enviar la orden:", e);
      errorToast(translate("Error_pucharse"));
    }
  };

  return (
    <div className="cart-container">
      <h2>
        {translate("YOUR")} <span>{translate("CART")}</span>
      </h2>
      {cart.length === 0 ? (
        <p>{translate("empty_cart")}</p>
      ) : (
        <>
          <div className="cart-header">
            <span>{translate("Product")}  </span>
            <span>{translate("Price")}</span>
            <span>{translate("Amount")}</span>
            <span>Total</span>
            <span>{translate("Delete_Product")}</span>
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
            <p className="total">{translate("Total_pay")}: ${total.toFixed(2)}</p>
            <Button
              text={translate("Pay")}
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
