import { createContext, useState, useContext, useEffect } from "react";
import { confirmDialog } from "../../utils/SweetAlert";
import { useTranslate } from "../../hooks/useTranslate";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const translate = useTranslate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        const updatedCart = prevCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        return updatedCart;
      } else {
        return [...prevCart, { ...product, amount: 1 }];
      }
    });
  };

  const updateAmount = (productId, amount) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, amount: Math.max(product.amount + amount, 1) }
          : product
      )
    );
  };

  const deleteProduct = async (productId) => {
    const confirmed = await confirmDialog({
      title: translate("Confirm_Delete"),
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Delete"),
      cancelButtonText: translate("Cancel"),
    });

    if (!confirmed) return;
    try {
      setCart((prevCart) =>
        prevCart.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.error("Error:", err);
      errorAlert({
        title: translate("Error"),
        text: translate("Delete_failed"),
      });
    }
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateAmount, deleteProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
