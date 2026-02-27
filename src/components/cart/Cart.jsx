import axiosInstance from "../../config/axiosInstance";
import { API_ENDPOINTS } from "../../config/api.config";
import { useCart } from "../../contexts/CartContext/CartContext";
import CartItem from "../cartItem/CartItem";
import Button from "../button/Button";
import "./Cart.css";
import { useTranslate } from "../../hooks/useTranslate";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

const Cart = () => {
  const { cart, updateAmount, deleteProduct } = useCart();
  const [checked, setChecked] = useState(false);
  const translate = useTranslate();
  const { userRole } = useContext(AuthContext);
  const role = Number(userRole);
  const isUser = role === 3 || !userRole;
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.amount,
    0,
  );
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  const handleIncreaseAmount = (productId) => {
    updateAmount(productId, 1);
  };

  const handleDecreaseAmount = (productId) => {
    updateAmount(productId, -1);
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("theFrog-token");

      if (!token) {
        alert(translate("login_required") || "Debes iniciar sesión");
        return;
      }

      if (cart.length === 0) {
        alert(translate("empty_cart") || "El carrito está vacío");
        return;
      }

      const response = await axiosInstance.post(
        API_ENDPOINTS.ORDERS,
        {
          items: cart.map((p) => ({
            gameId: p.id,
            quantity: p.amount,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { checkoutUrl } = response.data;

      if (checkoutUrl) {
        // Abrir MercadoPago en una pestaña nueva
        window.open(checkoutUrl, "_blank");
      } else {
        alert("Orden creada pero no se recibió checkoutUrl");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      console.error("Response data del backend:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error(
        "Body enviado:",
        JSON.stringify(
          {
            items: cart.map((p) => ({
              gameId: p.id,
              quantity: p.amount,
            })),
          },
          null,
          2,
        ),
      );
      alert(translate("checkout_error") || "Error al iniciar el pago");
    }
  };

  return (
    <div className="cart-container">
      <Button
        text={translate("Return")}
        onClick={() => window.history.back()}
        className="back-button"
      />
      <div className="tittleButton">
        <h2 className="h2Cart">
          {translate("YOUR")} {translate("CART")}
        </h2>
      </div>
      {cart.length === 0 ? (
        <div>
          <p className="h2Cart">{translate("empty_cart")}</p>
          <img
            src="/src/assets/img/emptyCart.png"
            alt="Empty Cart"
            className="imageEmptyCart"
          />
        </div>
      ) : (
        <>
          <div className="cart-header">
            <span>{translate("Product")} </span>
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
            <span className="total">
              {translate("Total_pay")}: ${total.toFixed(2)}
            </span>
            {isUser && (
              <>
                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={!checked}
                >
                  <span>{translate("Pay")}</span>
                </button>
                <label className="terms-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    className="terms-checkbox"
                  />
                  {translate("Accept_terms")}{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    {translate("Terms_and_Conditions")}
                  </a>
                </label>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
