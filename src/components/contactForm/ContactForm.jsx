import { useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";
import { Link } from "react-router";

const ContactForm = () => {
  const form = useRef();

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
      <input name="name" placeholder="Nombre" className="formInput" required />
      <input
        name="subject"
        placeholder="Asunto"
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
        placeholder="Mensaje"
        className="formInput"
        required
      />
      <button className="buttonContact" type="submit">
        Enviar
      </button>
      <Link to="/" className="buttonContact">
        Volver
      </Link>
    </form>
  );
};

export default ContactForm;
