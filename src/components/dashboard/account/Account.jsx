import React, { useState } from "react";
import "./Account.css";

const Account = () => {
  const [address, setAddress] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <button type="submit">Guardar Cambios</button>
      </form>
    </section>
  );
};

export default Account;
