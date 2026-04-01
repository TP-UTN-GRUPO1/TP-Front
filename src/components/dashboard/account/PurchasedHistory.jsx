import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import axiosInstance from "../../../config/axiosInstance";
import { API_ENDPOINTS } from "../../../config/api.config";
import { useTranslate } from "../../../hooks/useTranslate";
import PurchaseList from "../pucharseList/PurchaseList";
import "./PurchasedHistory.css";

const PurchasedHistory = () => {
  const { token, userRole } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const role = Number(userRole);
  const isAdminOrSysadmin = role === 1 || role === 2;
  const translate = useTranslate();

  const [orders, setOrders] = useState([]);
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(!isAdminOrSysadmin);

  const [searchEmail, setSearchEmail] = useState("");
  const [searchedEmail, setSearchedEmail] = useState("");
  const [searchError, setSearchError] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchOrdersForUser = async (targetUserId) => {
    setLoading(true);
    setSearchError("");
    try {
      const res = await axiosInstance.get(
        API_ENDPOINTS.ORDERS_BY_USER(targetUserId),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = Array.isArray(res.data) ? res.data : [];
      setOrders(data);

      const gameIds = [
        ...new Set(
          data.flatMap((order) =>
            (order.orderItems || order.items || [])
              .map((item) => item.gameId || item.game_id || item.game?.id)
              .filter(Boolean)
          )
        ),
      ];

      const gamesMap = {};

      await Promise.all(
        gameIds.map(async (id) => {
          try {
            const gameRes = await axiosInstance.get(
              API_ENDPOINTS.GAME_BY_ID(id),
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            gamesMap[id] = gameRes.data;
          } catch (e) {}
        })
      );

      setGames(gamesMap);
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdminOrSysadmin) {
      if (userId) fetchOrdersForUser(userId);
      else setLoading(false);
    }
  }, [userId, token]);

  const handleSearchByEmail = async () => {
    if (!searchEmail.trim()) return;

    setLoading(true);
    setSearchError("");
    setOrders([]);
    setGames({});
    setSearchedEmail("");

    try {
      const usersRes = await axiosInstance.get(API_ENDPOINTS.USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = Array.isArray(usersRes.data)
        ? usersRes.data
        : [];

      const foundUser = users.find(
        (u) =>
          (u.email || u.Email || "").toLowerCase() ===
          searchEmail.trim().toLowerCase()
      );

      if (!foundUser) {
        setSearchError(translate("No_user_found"));
        setLoading(false);
        return;
      }

      setSearchedEmail(foundUser.email || foundUser.Email);

      await fetchOrdersForUser(
        foundUser.id || foundUser.Id || foundUser.userId
      );
    } catch (err) {
      setSearchError(translate("No_user_found"));
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchByEmail();
  };

  // 🔴 ADMIN VIEW
  if (isAdminOrSysadmin) {
    return (
      <div className="ph-container">
        <h2 className="ph-title">{translate("Pucharse_history")}</h2>

        <div className="ph-search-bar">
          <input
            type="email"
            className="ph-search-input"
            placeholder={translate("Enter_user_email")}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="ph-search-btn" onClick={handleSearchByEmail}>
            {translate("Search_btn")}
          </button>
        </div>

        {searchError && <p className="ph-error">{searchError}</p>}

        {loading && (
          <p className="ph-message">
            {translate("Loading_pucharse")}
          </p>
        )}

        {!loading && searchedEmail && (
          <>
            <h3 className="ph-subtitle">
              {translate("Orders_of")}: {searchedEmail}
            </h3>

            <PurchaseList
              orders={orders}
              games={games}
              translate={translate}
              formatDate={formatDate}
            />
          </>
        )}

        {!loading && !searchedEmail && !searchError && (
          <p className="ph-message">
            {translate("Search_user_email")}
          </p>
        )}
      </div>
    );
  }

  // 🔵 USER VIEW
  if (loading)
    return (
      <p className="ph-message">
        {translate("Loading_pucharse")}
      </p>
    );

  if (orders.length === 0)
    return (
      <p className="ph-message">
        {translate("No_pucharse")}
      </p>
    );

  return (
    <div className="ph-container">
      <h2 className="ph-title">{translate("Pucharse_history")}</h2>

      <PurchaseList
        orders={orders}
        games={games}
        translate={translate}
        formatDate={formatDate}
      />
    </div>
  );
};

export default PurchasedHistory;