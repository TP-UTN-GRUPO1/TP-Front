import { useContext } from "react";
import { Form } from "react-bootstrap";
import { TranslateContext } from "../../contexts/translateContext/Translate.context";
import { useTranslate } from "../../hooks/useTranslate";

const ToggleLanguage = () => {
  const { language, handleChangeLanguage } = useContext(TranslateContext);
  const translate = useTranslate();
  const changeLanguage = (e) => {
    handleChangeLanguage(e.target.value);
  };
  return (
    <Form.Select
      onChange={changeLanguage}
      value={language}
      aria-label="Select Language"
      className="buttonTranslate"
    >
      <option value="es" className="optionLanguage">
        {translate("spanish_lang")}{" "}
      </option>
      <option value="en" className="optionLanguage">
        {translate("english_lang")}
      </option>
    </Form.Select>
  );
};

export default ToggleLanguage;
