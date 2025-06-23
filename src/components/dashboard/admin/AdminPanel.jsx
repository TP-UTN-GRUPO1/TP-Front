import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, okAlert } from "../../../utils/SweetAlert";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const token = localStorage.getItem("token");
  const translate = useTranslate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok)
          throw new Error("No autorizado o error en la solicitud");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        toast.error(`Error al cargar usuarios: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchUsers();
  }, [token]);

  const handleSearch = () => {
    const result = users.filter((u) =>
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    if (result.length === 0) {
      toast.error("No se encontró ningún email coincidente", {
        position: "top-right",
        autoClose: 3000,
      });
      setFilteredUsers([]);
      return;
    }
    setFilteredUsers(
      selectedRole === "all"
        ? result
        : result.filter((u) => u.role?.roleName === selectedRole)
    );
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setFilteredUsers(
      role === "all" ? users : users.filter((u) => u.role?.roleName === role)
    );
  };

  const handleChangeRole = async (userId, newRole) => {
    const confirmed = await confirmDialog({
      title: `${translate("Confirm_change_role")} ${
        newRole === "user" ? "usuario" : newRole
      }?`,
      text: translate("Are_you_sure"),
      confirmButtonText: translate("Yes_Confirm"),
      cancelButtonText: translate("Cancel"),
    });
    if (!confirmed) return;
    try {
      let response = await fetch(`http://localhost:3000/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roleName: newRole }),
      });
      if (!response.ok) throw new Error("Error al cambiar el rol");
      response = await fetch("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al recargar usuarios");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(
        selectedRole === "all"
          ? data
          : data.filter((u) => u.role?.roleName === selectedRole)
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
      toast.error(`Error al cambiar el rol: ${err.message}`, {
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
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al eliminar usuario");
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter(
          (u) => selectedRole === "all" || u.Role?.roleName === selectedRole
        )
      );
      toast.success(translate("Delete_user"), {
        position: "top-right",
        autoClose: 3000,
      });
      okAlert({
        title: translate("Deleted"),
        text: translate("Delete_user"),
      });
    } catch (err) {
      toast.error(`${translate("Err_delete_user")} ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleViewPurchases = async (id, email) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("No se pudo obtener el historial de compras");
      const data = await response.json();
      if (selectedUserEmail === email) {
        setSelectedUserOrders([]);
        setSelectedUserEmail("");
        return;
      }
      setSelectedUserOrders(data);
      setSelectedUserEmail(email);
    } catch (err) {
      toast.error(`Error al obtener compras: ${err.message}`, {
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
              {user.role?.roleName || translate("No_role")}
            </span>
            <select
              onChange={(e) => handleChangeRole(user.id, e.target.value)}
              value={user.role?.roleName || "user"}
            >
              <option value="user">{translate("User")}</option>
              <option value="admin">Admin</option>
              <option value="sysadmin">Sysadmin</option>
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
              <div key={order.orderId}>
                <p>
                  <strong>{translate("Date")}:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                </p>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.order_item_id}>
                      <img src={item.game.imageUrl} alt={item.game.nameGame} />
                      {item.game.nameGame} - {translate("Amount")}:{" "}
                      {item.quantity}, {translate("Price")}: $
                      {item.unitPrice.toFixed(2)}
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
