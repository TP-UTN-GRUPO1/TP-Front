import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");

  const token = localStorage.getItem("token");

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No autorizado o error en la solicitud");
        }

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
  }, []);

  // Función para buscar usuarios por email
  const handleSearch = () => {
    const result = users.filter((u) =>
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    if (!result || result.length === 0) {
      toast.error("No se encontró ningún email coincidente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFilteredUsers([]);
      return;
    }

    if (selectedRole === "all") {
      setFilteredUsers(result);
    } else {
      setFilteredUsers(result.filter((u) => u.Role?.roleName === selectedRole));
    }
  };

  // Función para filtrar usuarios por rol
  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    if (role === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((u) => u.Role?.roleName === role));
    }
  };

  // Función para cambiar el rol de un usuario
  const handleChangeRole = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roleName: newRole }),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar el rol");
      }

      const res = await fetch("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al recargar usuarios");
      }

      const data = await res.json();
      setUsers(data);
      if (selectedRole === "all") {
        setFilteredUsers(data);
      } else {
        setFilteredUsers(data.filter((u) => u.Role?.roleName === selectedRole));
      }
      toast.success("Rol actualizado correctamente", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Error al cambiar el rol: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Función para eliminar un usuario
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, { // Corregida la URL (era /user/, ahora /users/)
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter(
          (u) => selectedRole === "all" || u.Role?.roleName === selectedRole
        )
      );
      toast.success("Usuario eliminado correctamente", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Error al eliminar usuario: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <ToastContainer />

      <div>
        <input
          type="text"
          placeholder="Buscar por email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div>
        <select
          onChange={(e) => handleRoleFilter(e.target.value)}
          value={selectedRole}
        >
          <option value="all">Todos</option>
          <option value="user">Usuario</option>
          <option value="admin">Admin</option>
          <option value="sysadmin">Sysadmin</option>
        </select>
      </div>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} | {user.email} | Rol: {user.Role?.roleName || "Sin rol"}
            <select
              onChange={(e) => handleChangeRole(user.id, e.target.value)}
              value={user.Role?.roleName || "user"}
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
              <option value="sysadmin">Sysadmin</option>
            </select>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;