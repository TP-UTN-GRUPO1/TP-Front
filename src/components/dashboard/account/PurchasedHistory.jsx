import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/Auth.Context";
import axios from "axios";
import { useTranslate } from "../../../hooks/useTranslate";

const PurchasedHistory = () => {
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const translate = useTranslate()

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
      <h2>{translate("Pucharse_history")}</h2>
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
            <strong>{translate("Date")}:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <h4>{translate()}:</h4>
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
                {item.game.nameGame} - {translate("Amount")}: {item.quantity}, {translate("Price_unit")}: ${item.unitPrice.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchasedHistory;
