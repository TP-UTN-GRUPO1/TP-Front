import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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

  const deleteProduct = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
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
