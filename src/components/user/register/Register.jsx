import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateString,
  validateEmail,
  validatePassword,
  isOverMinimumAge,
} from "./register.services.js";
import "../login/Login.css";
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

  return (
    <section className="containerLogin">
      <h1 className="h1Login">Registrarse</h1>
      <form className="formLogin" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputLogin"
          placeholder="Usuario"
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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="inputLogin"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="buttonLogin" type="submit">
          Registrarse
        </button>
        <Link to="/" className="buttonLogin">
          Volver
        </Link>
        {error && <p className="errorLogin">{error}</p>}
      </form>
      <p className="loginRedirect">
        <Link to="/login" className="linkLogin">
          ¿Ya tienes cuenta? ¡Inicia sesión!
        </Link>
      </p>
    </section>
  );
}

export default Register;
