import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Err.css";
import { useTranslate } from "../../hooks/useTranslate";
import { FaExclamationCircle } from "react-icons/fa"; // Icono de error/alerta

const FailedPurchase = () => {
  const translate = useTranslate();

  return (
    <div className="unauthorized-container">
      <div className="error-card text-center">
        {/* Usamos un color rojo suave o naranja para indicar el fallo */}
        <FaExclamationCircle className="error-icon" style={{ color: "#e74c3c", fontSize: "4rem" }} />
        
        <h1 className="error-heading mt-3">
          {translate("Failed purchase")}
        </h1>
        
        <p className="error-subtext mb-4">
          {translate("Unauthorized or failed payment")}
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

export default FailedPurchase;