import { useCart } from "../CartContext/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartDash } = useCart();
  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {cartDash.length === 0 ? (
        <p>Tu carrito esta vacio</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>4<p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Accion</p>
          </div>
          <ul className="cart-items">
            {cartDash.map((product) => {
              return (
                <li className="cart-item" key={product.id}>
                  <div className="product-info">
                    <img src={product.img} alt="" className="product-images" />
                    <span>{product.name}</span>
                  </div>
                  <p>${product.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button className="quantity-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      readOnly
                      value={product.amount}
                    />
                    <button className="quantity-btn">-</button>
                  </div>

                  <p>$0</p>
                  <button className="delete-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
