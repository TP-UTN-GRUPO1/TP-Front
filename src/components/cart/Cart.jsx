
import { useCart } from "../CartContext/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, updateAmount, deleteProduct } = useCart();

  const handleIncreaseAmount =(productId) =>{
    updateAmount(productId, 1)
  }

  const handleDecreaseAmount =(productId) =>{
    const product =cart.find((prod)=> prod.id === productId);
    if (product.amount > 1){
        updateAmount(productId, -1)
    }
  }
  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {cart.lengh === 0 ? (
        <p>Tu carrito esta vacio</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Accion</p>
          </div>
          <ul className="cart-items">
            {cart.map((product) => {
              return (
                <li className="cart-item" key={product.id}>
                  <div className="product-info">
                    <img src={product.img} alt="" className="product-images" />
                    <span>{product.name}</span>
                  </div>
                  <p>${product.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button className="quantity-btn"
                    onClick={()=> handleDecreaseAmount(product.id)}>-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      readOnly
                      value={product.amount}
                      onClick={()=> handleDecreaseAmount}
                    />
                    <button className="quantity-btn"
                    onClick={()=> handleIncreaseAmount(product.id)}>+</button>
                  </div>

                  <p>$0</p>
                  <button className="delete-btn" 
                  onClick={()=> deleteProduct(product.id)}>
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

export default Cart;
