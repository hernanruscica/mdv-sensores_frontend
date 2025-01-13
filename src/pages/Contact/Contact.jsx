import { useEffect } from "react";
import { Title1 } from "../../components/Title1/Title1";
import "./Contact.css";

const Contact = () => {
  // useEffect(() => {
  //   console.log("Contact component mounted");
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Usar la API de Formspree
    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/mgergzpp", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("¡Mensaje enviado exitosamente!");
      form.reset();
    } else {
      alert("Hubo un error al enviar el mensaje. Inténtelo de nuevo.");
    }
  };

  return (
    <>
      <main className="page__maincontent">
        <Title1 text="Contacto." type="contacto" />
        <form onSubmit={handleSubmit} className="login__form">
          <p>🙋🏻‍♂️ Déjanos un mensaje y te responderemos a la brevedad.</p>
          
          {/* Campo de correo electrónico (obligatorio) */}
          <div className="login__form__input-row">
            <label htmlFor="email" className="login__form__label">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

          {/* Campo de nombre (opcional) */}
          <div className="login__form__input-row">
            <label htmlFor="name" className="login__form__label">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese su nombre (opcional)"
            />
          </div>

          {/* Campo de mensaje (texto más amplio, no redimensionable) */}
          <div className="login__form__input-row">
            <label htmlFor="message" className="login__form__label">
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje aquí"
              rows="5"
              required
            ></textarea>
          </div>

          <button className="login__form__btn" type="submit">
            Enviar
          </button>
        </form>
      </main>
    </>
  );
};

export default Contact;
