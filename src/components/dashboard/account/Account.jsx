import { useState } from "react";
import "./Account.css";

const Account = () => {
  const [address, setAddress] = useState("");
  const [lastName, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirm = window.confirm("¿Querés guardar los cambios en tu cuenta?");
    if (!confirm) return;

    const body = { id: userId, address, lastName, city, province, country };

    try {
      const response = await fetch("http://localhost:3000/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section className="containerAccount">
      <h1>Mi Cuenta</h1>
      <form className="formAccount" onSubmit={handleSubmit}>
        <label>
          Dirección:
          <input
            type="text"
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          Ciudad:
          <input
            type="text"
            placeholder="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          Provincia:
          <input
            type="text"
            placeholder="Provincia"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </label>

        <label>
          País:
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Guardar Cambios
        </button>
      </form>
    </section>
  );
};

export default Account;
