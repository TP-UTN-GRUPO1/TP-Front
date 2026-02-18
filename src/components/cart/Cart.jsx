import axiosInstance from "../../config/axiosInstance";
import { API_ENDPOINTS } from "../../config/api.config";
import { useCart } from "../../contexts/CartContext/CartContext";
import CartItem from "../cartItem/CartItem";
import Button from "../button/Button";
import "./Cart.css";
import { errorToast, successToast } from "../../utils/notification";
import { useTranslate } from "../../hooks/useTranslate";
import { confirmDialog, okAlert, errorAlert } from "../../utils/SweetAlert";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

const Cart = () => {
  const { cart, updateAmount, deleteProduct, clearCart } = useCart();
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
    const stored = localStorage.getItem("theFrog-user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user?.id) {
      errorToast(translate("Log_in_to_continue"));
      return;
    }
    const confirmed = await confirmDialog({
      title: translate("ConfirmPurchase"),
      text: `${translate("Total_pay")}: $${total.toFixed(2)}`,
      confirmButtonText: translate("Yes_Pay"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) return;
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
      const token = localStorage.getItem("theFrog-token");
      const response = await axiosInstance.post(
        API_ENDPOINTS.ORDERS,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 201) {
        successToast(translate("Purchase_successfully"));
        clearCart();
        okAlert({
          title: translate("Purchase_success"),
          text: translate("Thank_you"),
        });
      } else alert("Ocurrió un error al procesar tu compra.");
    } catch (e) {
      console.error("Error al enviar la orden:", e);
      errorAlert({
        title: translate("Error"),
        text: translate("Purchase_failed"),
      });
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
        <img src="/src/assets/img/emptyCart.png" alt="Empty Cart" />
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
                  <a
                    href="Terminos y condiciones.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
