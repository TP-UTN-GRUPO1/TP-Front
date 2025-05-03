import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      console.log("Login exitoso. Token guardado.");

      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      if (err.response) {
        setError(err.response.data.message || "Error al iniciar sesión");
      } else {
        setError("Error de conexión con el servidor");
      }
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Iniciar sesion
        </button>
        <button className={styles.button} onClick={handleBack}>
          <Link to="/">Volver</Link>
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}

export default Login;
