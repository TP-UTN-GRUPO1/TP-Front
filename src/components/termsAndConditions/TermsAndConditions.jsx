import { useTranslate } from "../../hooks/useTranslate";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  const translate = useTranslate();

  return (
    <div className="terms-container">
      <h1>{translate("Terms_and_Conditions")}</h1>

      <h2>1. {translate("terms_acceptance_title")}</h2>
      <p>{translate("terms_acceptance_body")}</p>

      <h2>2. {translate("terms_services_title")}</h2>
      <p>{translate("terms_services_body")}</p>

      <h2>3. {translate("terms_account_title")}</h2>
      <ul>
        <li>{translate("terms_account_item1")}</li>
        <li>{translate("terms_account_item2")}</li>
        <li>{translate("terms_account_item3")}</li>
      </ul>

      <h2>4. {translate("terms_purchases_title")}</h2>
      <ul>
        <li>{translate("terms_purchases_item1")}</li>
        <li>{translate("terms_purchases_item2")}</li>
        <li>{translate("terms_purchases_item3")}</li>
      </ul>

      <h2>5. {translate("terms_intellectual_title")}</h2>
      <p>{translate("terms_intellectual_body")}</p>

      <h2>6. {translate("terms_liability_title")}</h2>
      <p>{translate("terms_liability_body")}</p>

      <h2>7. {translate("terms_modifications_title")}</h2>
      <p>{translate("terms_modifications_body")}</p>

      <h2>8. {translate("terms_contact_title")}</h2>
      <p>{translate("terms_contact_body")}</p>

      <p className="terms-last-updated">
        {translate("terms_last_updated")}: 27/02/2026
      </p>
    </div>
  );
};

export default TermsAndConditions;
