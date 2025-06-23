import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Err.css";
import { useTranslate } from "../../hooks/useTranslate";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  const translate = useTranslate();
  return (
    <div className="unauthorized-container">
      <div className="error-card">
        <FaLock className="error-icon" />
        <h1 className="error-heading">{translate("Err_401")}</h1>
        <p className="error-subtext">
          {translate("Unauthorized_access_message")}{" "}
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" className="return-button">
            {translate("Return")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
