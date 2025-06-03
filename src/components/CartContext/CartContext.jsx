import { Children, createContext, useState, useContext } from "react";

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
     const updateAmount = (prdouctId, amount) => {
       setCart ((prevCart) => prevCart.map((product)=>
      product.id === prdouctId
        ? {...product, amount: product.amount + amount} : product
      )
    )
    }

    const deleteProduct = (productId) => {
      setCart((prevCart) => 
        prevCart.filter((product) => product.id !== productId
    )) }
  return (
    <CartContext.Provider value={{ cart, addToCart, updateAmount, deleteProduct}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
