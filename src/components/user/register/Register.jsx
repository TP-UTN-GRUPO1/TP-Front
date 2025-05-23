import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateString,
  validateEmail,
  validatePassword,
  isOverMinimumAge,
} from "./register.services.js";
import styles from "../login/login.module.css";
import axios from "axios";

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

    // Validaciones
    if (!validateString(name, 3, 30)) {
      setError("Nombre debe tener entre 3 y 30 caracteres");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }

    if (!date || !isOverMinimumAge(date, 13)) {
      setError("Debes tener al menos 13 años");
      return;
    }

    if (!validatePassword(password, 7, 50, true, true, true)) {
      setError("Contraseña inválida: debe tener mayúscula, número y símbolo");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        email,
        date,
        password,
      });

      console.log("Registro exitoso:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      setError(error.response?.data?.message || "Error en el servidor");
    }
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
        <Link to="/" className={styles.button}>
          Volver
        </Link>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.loginRedirect}>
        <Link to="/login" className={styles.link}>
          ¿Ya tienes cuenta? ¡Inicia sesión!
        </Link>
      </p>
    </section>
  );
}

export default Register;
