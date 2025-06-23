import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Err.css";
import { useTranslate } from "../../hooks/useTranslate";
import { FaCompass } from "react-icons/fa";

const Err = () => {
  const translate = useTranslate();
  return (
    <div className="error-container">
      <div className="error-card">
        <FaCompass className="error-icon" />
        <h1 className="error-heading">{translate("Err_404")}</h1>
        <p className="error-subtext">{translate("Page_not_found_message")}</p>
        <Link to="/">
          <Button variant="primary" size="lg" className="return-button">
            {translate("return")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Err;
