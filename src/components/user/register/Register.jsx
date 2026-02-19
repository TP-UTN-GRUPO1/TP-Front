import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateString,
  validateEmail,
  validatePassword,
  isBetweenValidAges,
} from "./register.services.js";
import "../login/Login.css";
import axiosInstance from "../../../config/axiosInstance.js";
import { useTranslate } from "../../../hooks/useTranslate.jsx";
import { successToast, errorToast } from "../../../utils/notification.jsx";
import { API_ENDPOINTS } from "../../../config/api.config.js";
import PasswordInput from "../passwordInput/PasswordInput.jsx";

function Register() {
  const navigate = useNavigate();
  const translate = useTranslate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


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

    if (!birthDate || !isBetweenValidAges(birthDate, 13)) {
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
      const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, {
        name,
        lastName,
        email,
        birthDate,
        password,
      });

      successToast(translate("Success_register"));
      navigate("/login");
    } catch (error) {
      console.error("❌ Error completo:", error);
      console.table({
        Código: error.code,
        Mensaje: error.message,
        URL: error.config?.url,
        Método: error.config?.method?.toUpperCase(),
        Status: error.response?.status,
        Respuesta: error.response?.data,
      });

      if (error.code === "ERR_NETWORK") {
        setError(
          "No se puede conectar con el servidor. Verifica que el backend está corriendo.",
        );
      } else if (error.code === "ECONNABORTED") {
        setError("La solicitud tardó demasiado. Intenta de nuevo.");
      } else if (error.response) {
        setError(error.response?.data?.message || "Error en el servidor");
      } else if (error.request) {
        setError("Error de conexión. Respuesta vacía del servidor.");
      } else {
        setError(error.message);
      }

      errorToast(translate("Err_ocurred"));
    }
  };

  return (
    <section className="containerLogin">
      <h1 className="h1Login">{translate("Register")}</h1>
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
          placeholder={translate("Last_name")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
          placeholder={translate("Birth_Date")}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={translate("Password")}
        />

        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={translate("Confirm_Password")}
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
