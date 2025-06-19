import { useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";
import { Link } from "react-router";
import { useTranslate } from "../../hooks/useTranslate";

const ContactForm = () => {
  const form = useRef();
  const translate = useTranslate();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cg10utl",
        "template_nw6y3m7",
        form.current,
        "LeqgRnLS6esZHgF2o"
      )
      .then(
        (result) => {
          alert("Mensaje enviado con éxito");
          form.current.reset();
        },
        (error) => {
          alert("Error al enviar el mensaje");
          console.error(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="formContact">
      <input name="name" placeholder={translate("Name")} className="formInput" required />
      <input
        name="subject"
        placeholder={translate("subject")}
        className="formInput"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="formInput"
        required
      />
      <textarea
        name="message"
        placeholder={translate("Message")}
        className="formInput"
        required
      />
      <button className="buttonContact" type="submit">
        {translate("Send")}
      </button>
      <Link to="/" className="buttonContact">
        {translate("Return")}
      </Link>
    </form>
  );
};

export default ContactForm;
