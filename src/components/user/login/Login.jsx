import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword, loginUser } from "./LoginServices.js";
import { errorToast, successToast } from "../../../utils/notification.jsx";
import { AuthContext } from "../../../contexts/auth/AuthContext.jsx";
import "./Login.css";
import { useTranslate } from "../../../hooks/useTranslate.jsx";
import PasswordInput from "../passwordInput/PasswordInput.jsx";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    errors: { email: false, password: false },
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const translate = useTranslate();
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
      errorToast(translate("Invalid_Email"));
      return;
    } else if (
      !form.password.length ||
      !validatePassword(form.password, 7, null, true, true, true)
    ) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, password: true },
      }));
      errorToast(translate("Incorrect_Password"));
      passwordRef.current.focus();
      return;
    }

    loginUser(
      form.email,
      form.password,
      (token, userData) => {
        handleUserLogin(token, userData);
        navigate("/");
        successToast(translate("Session_started"));
      },
      (err) => errorToast(err),
    );
  };

  return (
    <section className="containerLogin">
      <h1 className="h1Login">{translate("Login")}</h1>
      <form className="formLogin" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          ref={emailRef}
          className="inputLogin"
          placeholder={translate("Enter_email")}
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        <PasswordInput
          value={form.password}
          name="password"
          placeholder={translate("Password")}
          onChange={handleChange}
          inputRef={passwordRef}
        />
        <button className="buttonLogin" type="submit">
          {translate("Login")}
        </button>

        <div className="loginDivider">{translate("or")}</div>

        <h3 className="loginQuestion">{translate("Have_account?")}</h3>
        <Link to="/register" className="buttonLogin buttonSecondary">
          {translate("Register")}
        </Link>

        <Link to="/" className="linkLogin">
          ← {translate("Return")}
        </Link>

        {form.errors.email && <p className="errorLogin">Email inválido</p>}
        {form.errors.password && (
          <p className="errorLogin">{translate("Invalid_Password")}</p>
        )}
      </form>
    </section>
  );
};
export default Login;
