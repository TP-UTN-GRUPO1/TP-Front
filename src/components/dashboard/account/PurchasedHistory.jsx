import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/Auth.Context";
import axios from "axios";

const PurchasedHistory = () => {
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/orders/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
  }, [userId, token]);

  if (loading) return <p>Cargando historial de compras...</p>;
  if (orders.length === 0) return <p>No has realizado compras aún.</p>;

  return (
    <div>
      <h2>Historial de Compras</h2>
      {orders.map((order) => (
        <div
          key={order.orderId}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p>
            <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <h4>Juegos:</h4>
          <ul>
            {order.orderItems.map((item) => (
              <li
                key={item.order_item_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <img
                  src={item.game.imageUrl}
                  alt={item.game.nameGame}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginRight: "1rem",
                    borderRadius: "8px",
                  }}
                />
                {item.game.nameGame} - Cantidad: {item.quantity}, Precio
                Unitario: ${item.unitPrice.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchasedHistory;
