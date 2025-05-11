import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../login/login.module.css";
// import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!name || !email || !date || !password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    // try {
    //   const response = await axios.post("http://localhost:3000/register", {
    //     name,
    //     email,
    //     date,
    //     password,
    //   });

    //   console.log("Registro exitoso:", response.data);
    //   navigate("/login");
    // } catch (error) {
    //   console.error("Error en el registro:", error);
    //   setError(error.response?.data?.message || "Error en el servidor");
    // }

    fetch("http://localhost:3000/register", {

        headers:{
          "Content-type": "application/json"
        },
        method:"POST",
        body: JSON.stringify({name, email, date, password})
    })
    .then(res => res.json())
    .then(()=>{
      console.log("Usuario creado!")
      navigate("/login");
    })

  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Registrarse</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          className={styles.input}
          placeholder="Fecha de nacimiento"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
        <button className={styles.button} onClick={handleBack}>
          <Link to="/">Volver</Link>
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}

export default Register;
