import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { validateEmail, validatePassword } from "./Login.services.js";
import { errorToast } from "../../../utils/notification.jsx";
import { AuthContext } from "../../../auth/Auth.Context.jsx";
import { loginUser } from "./Login.services.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { handleUserLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value.length || !validateEmail(email)) {
      setErrors({ ...errors, email: true });
      errorToast("Email invalido");
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

    loginUser(
      email,
      password,
      (token) => {
        handleUserLogin(token);
        navigate("/");
      },
      (err) => {
        errorToast(err);
      }
    );
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
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          ref={passwordRef}
          className={styles.input}
          placeholder="Contraseña"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Iniciar sesion
        </button>
        <>
          <h3>¿No tienes cuenta?</h3>
          <Link to="/register" className={styles.button}>
            Registrarse
          </Link>
        </>
        <>
          <Link to="/" className={styles.button}>
            Volver
          </Link>
        </>
        {errors.email && <p className={styles.error}>Email inválido</p>}
        {errors.password && <p className={styles.error}>Contraseña inválida</p>}
      </form>
    </section>
  );
};
export default Login;
