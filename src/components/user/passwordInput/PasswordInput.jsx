import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";

function PasswordInput({
  value,
  onChange,
  placeholder,
  name,
  inputRef,
  required = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="passwordContainer">
      <input
        type={showPassword ? "text" : "password"}
        className={`inputLogin ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        ref={inputRef}
        required={required}
      />

      <button
        type="button"
        className="eyeButton"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

export default PasswordInput;
