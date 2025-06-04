// import "./Button.css";

const Button = ({ text, onClick, className = "", disabled = false }) => (
  <button className={`btn ${className}`} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
