import { useTranslate } from "../../hooks/useTranslate";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  const translate = useTranslate();
  return(
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>{translate("loading")}</p>
  </div>
);
};

export default LoadingSpinner;
