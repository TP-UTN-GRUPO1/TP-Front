import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { validateEmail, validatePassword } from "./login.services.js";
import { errorToast } from "../../../utils/notification.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value.length || !validateEmail(email)) {
      setErrors({ ...errors, email: true });
      errorToast("Email invalido");
      ExclamationCircleFill.current.focus();
      return;
    } else if (
      !password.length ||
      !validatePassword(password, 7, null, true, true)
    ) {
      setErrors({ ...errors, password: true });
      errorToast("Contraseña incorrecta!");
      passwordRef.current.focus();
      return;
    }
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

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          required
          ref={emailRef}
          className={styles.input}
          placeholder="Ingresa email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          ref={passwordRef}
          className={styles.input}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Iniciar sesion
        </button>
        <Link to="/" className={styles.button}>
          Volver
        </Link>
        {errors.email && <p className={styles.error}>Email inválido</p>}
        {errors.password && <p className={styles.error}>Contraseña inválida</p>}
      </form>
    </section>
  );
}

export default Login;
