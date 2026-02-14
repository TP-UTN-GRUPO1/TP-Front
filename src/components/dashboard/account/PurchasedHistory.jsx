import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import axiosInstance from "../../../config/axiosInstance";
import { API_ENDPOINTS } from "../../../config/api.config";
import { useTranslate } from "../../../hooks/useTranslate";
import "./PurchasedHistory.css";

const PurchasedHistory = () => {
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const translate = useTranslate();

  const [orders, setOrders] = useState([]);
  const [games, setGames] = useState({});
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

        // Obtener los IDs únicos de juegos de todas las órdenes
        const gameIds = [
          ...new Set(
            data.flatMap((order) =>
              (order.orderItems || order.items || [])
                .map((item) => item.gameId || item.game_id || item.game?.id)
                .filter(Boolean),
            ),
          ),
        ];

        // Buscar los datos de cada juego
        const gamesMap = {};
        await Promise.all(
          gameIds.map(async (id) => {
            try {
              const gameRes = await axiosInstance.get(
                API_ENDPOINTS.GAME_BY_ID(id),
                {
                  headers: { Authorization: `Bearer ${token}` },
                },
              );
              gamesMap[id] = gameRes.data;
            } catch (e) {
              console.error(`Error fetching game ${id}:`, e);
            }
          }),
        );
        setGames(gamesMap);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
    else setLoading(false);
  }, [userId, token]);

  if (loading)
    return <p className="ph-message">{translate("Loading_pucharse")}</p>;
  if (orders.length === 0)
    return <p className="ph-message">{translate("No_pucharse")}</p>;

  return (
    <div className="ph-container">
      <h2 className="ph-title">{translate("Pucharse_history")}</h2>
      {orders.map((order) => (
        <div key={order.orderId || order.id} className="ph-order-card">
          <p>
            <strong>{translate("Date")}:</strong>{" "}
            {new Date(
              order.createdAt || order.date || order.orderDate,
            ).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong>{" "}
            <span className="ph-total">
              ${(order.totalAmount || order.total || 0).toFixed(2)}
            </span>
          </p>
          <h4 className="ph-games-title">{translate("Games")}:</h4>
          <ul className="ph-items-list">
            {(order.orderItems || order.items || []).map((item, idx) => {
              const gameId = item.gameId || item.game_id || item.game?.id;
              const fetchedGame = games[gameId] || {};
              const game = item.game || fetchedGame;
              const gameName =
                game.nameGame || game.title || game.name || "Juego";
              const gameImg = game.imageURL || game.imageUrl || "";
              return (
                <li
                  key={item.order_item_id || item.orderItemId || item.id || idx}
                  className="ph-item"
                >
                  {gameImg && (
                    <img src={gameImg} alt={gameName} className="ph-item-img" />
                  )}
                  <div className="ph-item-info">
                    <span className="ph-item-name">{gameName}</span>
                    <span className="ph-item-detail">
                      {translate("Amount")}: {item.quantity} &middot;{" "}
                      {translate("Price_unit")}: $
                      {(item.unitPrice || item.price || 0).toFixed(2)}
                    </span>
                  </div>
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
