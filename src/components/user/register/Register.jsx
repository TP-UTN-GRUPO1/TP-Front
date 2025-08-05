import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateString,
  validateEmail,
  validatePassword,
  isBetweenValidAges,
} from "./register.services.js";
import "../login/Login.css";
import axios from "axios";
import { useTranslate } from "../../../hooks/useTranslate.jsx";
import { successToast, errorToast } from "../../../utils/notification.jsx";

function Register() {
  const navigate = useNavigate();
  const translate = useTranslate();
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
      setError(translate("Error_name"));
      return;
    }

    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }

    if (!date || !isBetweenValidAges(date, 13)) {
      setError(translate("Error_age"));
      return;
    }

    if (!validatePassword(password, 7, 50, true, true, true)) {
      setError(translate("Error_password"));
      return;
    }

    if (password !== confirmPassword) {
      setError(translate("Error_confirm_pass"));
      return;
    }

    try {
      const response = await axios.post(
        "https://thefrog-server.onrender.com/register",
        {
          name,
          email,
          date,
          password,
        }
      );

      successToast("Registro exitoso");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      setError(error.response?.data?.message || "Error en el servidor");
      errorToast("ocurrio un error!");
    }
  };

  return (
    <section className="containerLogin">
      <h1 className="h1Login">Registrarse</h1>
      <form className="formLogin" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputLogin"
          placeholder={translate("User")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="inputLogin"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <input
          type="date"
          className="inputLogin"
          placeholder="Fecha de nacimiento"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="password"
          className="inputLogin"
          placeholder={translate("Password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="inputLogin"
          placeholder={translate("Confirm_Password")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="buttonLogin" type="submit">
          {translate("Register")}
        </button>
        <Link to="/" className="buttonLogin">
          {translate("Return")}
        </Link>
        {error && <p className="errorLogin">{error}</p>}
      </form>
      <p className="loginRedirect">
        <Link to="/login" className="linkLogin">
          {translate("Already_account?")}
        </Link>
      </p>
    </section>
  );
}

export default Register;
