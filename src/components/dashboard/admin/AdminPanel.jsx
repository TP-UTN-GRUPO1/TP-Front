import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, okAlert } from "../../../utils/SweetAlert";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import axiosInstance from "../../../config/axiosInstance";
import { API_ENDPOINTS } from "../../../config/api.config";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const { token } = useContext(AuthContext);
  const translate = useTranslate();

  const ROLE_NAMES = { 1: "SysAdmin", 2: "Admin", 3: "User" };

  // Extrae el nombre del rol de forma robusta según la estructura de la API
  const getRoleName = (user) => {
    const roleId = user.roleId || user.role?.roleId || user.role?.id;
    if (roleId && ROLE_NAMES[roleId]) return ROLE_NAMES[roleId];
    return (
      user.role?.roleName ||
      user.role?.name ||
      user.roleName ||
      user.Role?.RoleName ||
      user.Role?.roleName ||
      null
    );
  };

  // Extrae el roleId numérico del usuario
  const getRoleId = (user) => {
    return user.roleId || user.role?.roleId || user.role?.id || 3;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.USERS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("👥 Users response:", response.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        toast.error(`${translate("Err_Load_Users")} ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    if (token) fetchUsers();
  }, [token]);

  useEffect(() => {
    if (searchEmail.trim() !== "") {
      setSelectedUserOrders([]);
      setSelectedUserEmail("");
    }
  }, [searchEmail]);

  const handleSearch = () => {
    const result = users.filter((u) =>
      u.email.toLowerCase().includes(searchEmail.toLowerCase()),
    );
    if (result.length === 0) {
      toast.error(translate("No_found_email"), {
        position: "top-right",
        autoClose: 3000,
      });
      setFilteredUsers([]);
      return;
    }
    setFilteredUsers(
      selectedRole === "all"
        ? result
        : result.filter((u) => getRoleName(u) === selectedRole),
    );
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setFilteredUsers(
      role === "all" ? users : users.filter((u) => getRoleName(u) === role),
    );
  };

  const handleChangeRole = async (userId, newRoleId) => {
    const roleId = Number(newRoleId);
    const roleName = ROLE_NAMES[roleId] || "usuario";
    const confirmed = await confirmDialog({
      title: `${translate("Confirm_change_role")} ${roleName}?`,
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Confirm"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) return;
    try {
      await axiosInstance.put(
        `${API_ENDPOINTS.USER_BY_ID(userId)}/role`,
        { RoleId: roleId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const response = await axiosInstance.get(API_ENDPOINTS.USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setUsers(data);
      setFilteredUsers(
        selectedRole === "all"
          ? data
          : data.filter((u) => getRoleName(u) === selectedRole),
      );
      toast.success(translate("Updated_role_confirmed"), {
        position: "top-right",
        autoClose: 3000,
      });
      okAlert({
        title: translate("Updated"),
        text: translate("Updated_role"),
      });
    } catch (err) {
      toast.error(`${translate("Err_Change_role")} ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog({
      title: translate("Confirm_delete_user"),
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Confirm"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) return;
    try {
      await axiosInstance.delete(API_ENDPOINTS.USER_DELETE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter(
          (u) => selectedRole === "all" || getRoleName(u) === selectedRole,
        ),
      );
      toast.success(translate("Delete_user_confirmed"), {
        position: "top-right",
        autoClose: 3000,
      });
      okAlert({
        title: translate("Deleted"),
        text: translate("Delete_user_confirmed"),
      });
    } catch (err) {
      toast.error(`${translate("Err_delete_user")} ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleViewPurchases = async (id, email) => {
    if (selectedUserEmail === email) {
      setSelectedUserOrders([]);
      setSelectedUserEmail("");
      return;
    }

    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.ORDERS_BY_USER(id),
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = Array.isArray(response.data) ? response.data : [];

      // Si viene vacío igual lo mostramos
      if (data.length === 0) {
        setSelectedUserOrders([]);
        setSelectedUserEmail(email);
        return;
      }

      // Obtener IDs únicos de juegos
      const gameIds = [
        ...new Set(
          data.flatMap((order) =>
            (order.orderItems || order.items || [])
              .map((item) => item.gameId || item.game_id || item.game?.id)
              .filter(Boolean),
          ),
        ),
      ];

      const gamesMap = {};

      await Promise.all(
        gameIds.map(async (gId) => {
          try {
            const gameRes = await axiosInstance.get(
              API_ENDPOINTS.GAME_BY_ID(gId),
              { headers: { Authorization: `Bearer ${token}` } },
            );
            gamesMap[gId] = gameRes.data;
          } catch (e) {
            console.error(`Error fetching game ${gId}:`, e);
          }
        }),
      );

      const enrichedData = data.map((order) => ({
        ...order,
        orderItems: (order.orderItems || order.items || []).map((item) => {
          const gameId = item.gameId || item.game_id || item.game?.id;
          const fetchedGame = gamesMap[gameId] || {};

          return {
            ...item,
            game: {
              nameGame:
                fetchedGame.title ||
                item.game?.nameGame ||
                item.game?.title ||
                "Juego",
              imageUrl:
                fetchedGame.imageUrl ||
                item.game?.imageUrl ||
                item.game?.imageURL ||
                "",
            },
          };
        }),
      }));

      setSelectedUserOrders(enrichedData);
      setSelectedUserEmail(email);
    } catch (err) {
      if (err.response?.status === 404) {
        setSelectedUserOrders([]);
        setSelectedUserEmail(email);
        return;
      }

      toast.error(`${translate("No_found_pucharse")} ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="containerAdmin">
      <h2>{translate("Admin_Dash")}</h2>
      <ToastContainer />
      <div className="filterSection">
        <input
          type="text"
          placeholder={translate("Search_email")}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch}>{translate("Search")}</button>
        <select
          onChange={(e) => handleRoleFilter(e.target.value)}
          value={selectedRole}
        >
          <option value="all">{translate("All")}</option>
          <option value="user">{translate("User")}</option>
          <option value="admin">Admin</option>
          <option value="sysadmin">Sysadmin</option>
        </select>
      </div>
      <ul className="userList">
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} | {user.email} | {translate("Role")}:{" "}
              {getRoleName(user) || translate("No_role")}
            </span>
            <select
              onChange={(e) => handleChangeRole(user.id, e.target.value)}
              value={getRoleId(user)}
            >
              <option value={3}>{translate("User")}</option>
              <option value={2}>Admin</option>
              <option value={1}>Sysadmin</option>
            </select>
            <button onClick={() => handleDelete(user.id)}>
              {translate("Delete")}
            </button>
            <button onClick={() => handleViewPurchases(user.id, user.email)}>
              {translate("See_Pucharse")}
            </button>
          </li>
        ))}
      </ul>
      {selectedUserEmail && (
        <div className="sectionOrders">
          <h3>
            {translate("Pucharses_of")}: {selectedUserEmail}
          </h3>
          {selectedUserOrders.length === 0 ? (
            <p>{translate("No_Purchase")}</p>
          ) : (
            selectedUserOrders.map((order) => (
              <div key={order.orderId || order.id}>
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
                <ul>
                  {(order.orderItems || order.items || []).map((item, idx) => (
                    <li
                      key={
                        item.order_item_id || item.orderItemId || item.id || idx
                      }
                    >
                      {item.game?.imageUrl && (
                        <img
                          src={item.game.imageUrl}
                          alt={item.game.nameGame || "Game"}
                        />
                      )}
                      {item.game?.nameGame || "Juego"} - {translate("Amount")}:{" "}
                      {item.quantity}, {translate("Price")}: $
                      {(item.unitPrice || item.price || 0).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
