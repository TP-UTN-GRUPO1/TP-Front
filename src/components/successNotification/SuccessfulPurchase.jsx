import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../err/Err.css"; 
import { useTranslate } from "../../hooks/useTranslate";
import { FaCheckCircle } from "react-icons/fa"; // Icono de éxito

const SuccessfulPurchase = () => {
  const translate = useTranslate();

  return (
    <div className="unauthorized-container">
      <div className="error-card text-center">
        {/* Icono verde para indicar éxito */}
        <FaCheckCircle className="error-icon" style={{ color: "#27ae60", fontSize: "4rem" }} />
        
        <h1 className="error-heading mt-3">
          {translate("Successful Purchase") || "¡Pago Aprobado!"}
        </h1>
        
        <p className="error-subtext mb-4">
          {translate("Successful Purchase") || "Tu pedido ha sido procesado correctamente."}
        </p>

       
        <Link to="/dashboard/purchasedHistory">
          <Button variant="success" size="lg" className="return-button">
            {translate("View My Orders") || "Ver mis órdenes"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulPurchase;