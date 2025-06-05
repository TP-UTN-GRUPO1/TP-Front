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
    <section className={styles.containerLogin}>
      <h1 className={styles.h1Login}>Iniciar sesión</h1>
      <form className={styles.formLogin} onSubmit={handleSubmit}>
        <input
          type="text"
          required
          ref={emailRef}
          className="inputLogin"
          placeholder="Ingresa email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          ref={passwordRef}
          className="inputLogin"
          placeholder="Contraseña"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.buttonLogin} type="submit">
          Iniciar sesion
        </button>
        <>
          <h3>¿No tienes cuenta?</h3>
          <Link to="/register" className={styles.buttonLogin}>
            Registrarse
          </Link>
        </>
        <>
          <Link to="/" className={styles.linkLogin}>
            Volver
          </Link>
        </>
        {errors.email && <p className={styles.errorLogin}>Email inválido</p>}
        {errors.password && (
          <p className={styles.errorLogin}>Contraseña inválida</p>
        )}
      </form>
    </section>
  );
};
export default Login;
