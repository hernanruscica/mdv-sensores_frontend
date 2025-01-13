import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Title1 } from "../../components/Title1/Title1";
import createApiClient from "../../api/apiClient";
import './SendActivationEmail.css'; // Asegúrate de tener el archivo CSS

const SendActivationEmail = () => {
  const [email, setEmail] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const apiClient = createApiClient();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [emailFound, setEmailFound] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    console.log('Click en email input');
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsSubmitDisabled(!emailRegex.test(newEmail));
  }

  const sendEmail = async (email) => {
    try {
      setLoading(true);
      setIsModalOpen(true);
      setModalMessage('Revisando dirección de correo...');
      const emailSended = await apiClient.get(`/api/users/sendactivation/${email}`);
      if (emailSended.status === 200) {
        if (emailSended.data.emailExists) {
          console.log(`Correo encontrado: ${email}`);
          setModalMessage('Correo electrónico encontrado. Revise su casilla de correo.');
          setEmailFound(true);
        } else {
          console.log(`Correo ${email} no encontrado.`);
          setModalMessage('Correo electrónico no encontrado.');
          setEmailFound(false);
        }
      } else {
        setModalMessage('Error al verificar el correo electrónico.');
        setEmailFound(false);
      }
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      setModalMessage('Error al verificar el correo electrónico.');
      setEmailFound(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(email);
  }

  const handleAcceptModal = () => {
    setIsModalOpen(false);
    if (emailFound) {
      navigate('/');
    }
  }

  return (
    <main className='page__maincontent'>
      <Title1
        type="usuarios"
        text={`Olvido de contraseña`}
      />
      <p className="page__maincontent__p">📧 En esta página podrá solicitar un reenvio del correo electrónico de cambio de contraseña</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="email">Correo Electrónico:</label>
            <div className="password-input-container">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
          </div>
          <div className="form_input">
            <button type="submit" className="form_btn" disabled={isSubmitDisabled}>
              Enviar Correo
            </button>
          </div>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={handleAcceptModal} className="form_btn" disabled={!emailFound}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SendActivationEmail;