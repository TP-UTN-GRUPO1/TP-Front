import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./Login.services.js";
import { errorToast, successToast } from "../../../utils/notification.jsx";
import { AuthContext } from "../../../auth/Auth.Context.jsx";
import "./Login.css";
import { loginUser } from "./Login.services.js";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    errors: { email: false, password: false },
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const { handleUserLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: false },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value.length || !validateEmail(form.email)) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, email: true },
      }));
      errorToast("Email invalido");
      return;
    } else if (
      !form.password.length ||
      !validatePassword(form.password, 7, null, true, true, true)
    ) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, password: true },
      }));
      errorToast("Contraseña incorrecta!");
      passwordRef.current.focus();
      return;
    }

    loginUser(
      form.email,
      form.password,
      (token) => {
        handleUserLogin(token);
        navigate("/");
        successToast("Sesion iniciada correctamente");
      },
      (err) => {
        errorToast(err);
      }
    );
  };

  return (
    <section className="containerLogin">
      <h1 className="h1Login">Iniciar sesión</h1>
      <form className="formLogin" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          ref={emailRef}
          className="inputLogin"
          placeholder="Ingresa email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          required
          ref={passwordRef}
          className="inputLogin"
          placeholder="Contraseña"
          value={form.password}
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button className="buttonLogin" type="submit">
          Iniciar sesion
        </button>
        <>
          <h3>¿No tienes cuenta?</h3>
          <Link to="/register" className="buttonLogin">
            Registrarse
          </Link>
        </>
        <>
          <Link to="/" className="linkLogin">
            Volver
          </Link>
        </>
        {form.errors.email && <p className="errorLogin">Email inválido</p>}
        {form.errors.password && (
          <p className="errorLogin">Contraseña inválida</p>
        )}
      </form>
    </section>
  );
};
export default Login;
