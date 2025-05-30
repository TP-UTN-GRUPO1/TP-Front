import "./Cart.css";
import { Children, createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const ifProductExist = prevCart.findIndex(
        (article) => article.id === product.id
      );
      if (ifProductExist >= 0) {
        const cartUpdate = [...prevCart];
        cartUpdate[ifProductExist].amount + 1;
        return cartUpdate;
      } else {
        return [...prevCart, { ...product, amount: 1 }];
      }
    });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
