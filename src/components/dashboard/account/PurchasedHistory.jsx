import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import axiosInstance from "../../../config/axiosInstance";
import { API_ENDPOINTS } from "../../../config/api.config";
import { useTranslate } from "../../../hooks/useTranslate";

const PurchasedHistory = () => {
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const translate = useTranslate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(
          API_ENDPOINTS.ORDERS_BY_USER(userId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("📦 Orders response:", res.data);
        const data = Array.isArray(res.data) ? res.data : [];
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
    else setLoading(false);
  }, [userId, token]);

  if (loading) return <p>{translate("Loading_pucharse")}</p>;
  if (orders.length === 0) return <p>{translate("No_pucharse")}</p>;

  return (
    <div>
      <h2>{translate("Pucharse_history")}</h2>
      {orders.map((order) => (
        <div
          key={order.orderId || order.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p>
            <strong>{translate("Date")}:</strong>{" "}
            {new Date(
              order.createdAt || order.date || order.orderDate,
            ).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> $
            {(order.totalAmount || order.total || 0).toFixed(2)}
          </p>
          <h4>{translate("Games")}:</h4>
          <ul>
            {(order.orderItems || order.items || []).map((item, idx) => {
              const game = item.game || {};
              const gameName =
                game.nameGame || game.title || game.name || "Juego";
              const gameImg = game.imageURL || game.imageUrl || "";
              return (
                <li
                  key={item.order_item_id || item.orderItemId || item.id || idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  {gameImg && (
                    <img
                      src={gameImg}
                      alt={gameName}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "1rem",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  {gameName} - {translate("Amount")}: {item.quantity},{" "}
                  {translate("Price_unit")}: $
                  {(item.unitPrice || item.price || 0).toFixed(2)}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchasedHistory;
