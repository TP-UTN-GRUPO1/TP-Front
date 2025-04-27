import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (username.trim() === "" || password.trim() === "") {
      setError("Por favor completa todos los campos");
      return;
    }

    console.log("Usuario registrado:", username);
    navigate("/login");
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Registrarse</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="date"
          className={styles.input}
          placeholder="Fecha de nacimiento"
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
        <input
          type="password"
          className={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Registrarse
        </button>
        <button className={styles.button}>
          <Link to="/">
          Volver
        </Link>  
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}

export default Register;
