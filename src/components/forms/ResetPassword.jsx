import { useState, useEffect } from "react";
import createApiClient from "../../api/apiClient.js";

import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from '../../context/AuthContext.jsx'
import { ENV } from "../../context/env";

import Modal from "react-modal";
Modal.setAppElement("#root");

function ResetPassword({ userId }) {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  //const [hasSymbol, setHasSymbol] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // NUEVO ESTADO PARA VISIBILIDAD
 
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const apiClient = createApiClient();

  const handleChangePass = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleChangePass2 = (e) => {
    setPassword2(e.target.value);
  };

  const togglePasswordVisibility = () => { // NUEVA FUNCIÓN PARA TOGGLE
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Validación de coincidencia de contraseñas
    if (password && password2 && password !== password2) {
      setPasswordMatchError('Las contraseñas no coinciden');
    } else {
      setPasswordMatchError('');
    }

    // Validación de complejidad de la contraseña
    setHasUpper(/[A-Z]/.test(password));
    setHasLower(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    //setHasSymbol(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password));

    // Validación de longitud mínima
    setIsLongEnough(password.length >= 8);
  }, [password, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalIsOpen(true);
      return;
    }

    //if (!hasUpper || !hasLower || !hasNumber || !hasSymbol || !isLongEnough) {
    if (!hasUpper || !hasLower || !hasNumber || !isLongEnough) {
      setModalMessage("La contraseña no cumple con los requisitos de seguridad.");
      setModalIsOpen(true);
      return;
    }

    // Aquí iría la lógica para cambiar la contraseña en el backend
    const formData = new FormData();
    formData.append("password", password);    
    
    const response = await apiClient.put(`/api/users/${userId}`, formData)
    
    if (response.status == 200)    {
      setModalMessage("Contraseña actualizada con éxito.");
      setModalIsOpen(true);
    }else{
      setModalMessage("La contraseña NO fue actualizada.");
      setModalIsOpen(true);
    }
  };

  //const isSubmitDisabled = !password || !password2 || passwordMatchError || !hasUpper || !hasLower || !hasNumber || !hasSymbol || !isLongEnough;
  const isSubmitDisabled = !password || !password2 || passwordMatchError || !hasUpper || !hasLower || !hasNumber || !isLongEnough;

  if (loading) {
    return <div>Cargando ...</div>;
  }

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/inicio`); // Comentado ya que no hay `user` definido en este componente
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">

        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-input-container"> {/* Contenedor para el input y el botón */}
              <input
                type={showPassword ? "text" : "password"} // CAMBIA EL TIPO DE INPUT
                name="password"
                id="password"
                value={password}
                onChange={handleChangePass}
              />
              <button
                type="button"
                className="password-toggle-button" // Agrega estilos a esta clase
                onClick={togglePasswordVisibility}
              >
                <img
                  src={`${ENV.URL}/icons/${showPassword ? 'eye-regular.svg' : 'eye-slash-regular.svg'}`}
                  className="pass-btn-icon"
                />   
              </button>
            </div>
            <div className="password-input-message">
              {!hasUpper && password && <label className="form_error_label">Debe contener al menos una mayúscula</label>}
              {!hasLower && password && <label className="form_error_label">Debe contener al menos una minúscula</label>}
              {!hasNumber && password && <label className="form_error_label">Debe contener al menos un número</label>}
              {/*!hasSymbol && password && <label className="form_error_label">Debe contener al menos un símbolo</label>*/}
              {!isLongEnough && password && <label className="form_error_label">Debe tener al menos 8 caracteres</label>}
            </div>
          </div>
          <div className="form_input">
            <label htmlFor="password2">Repita la Contraseña:</label>
            <div className="password-input-container"> {/* Contenedor para el input y el botón */}
              <input
                type={showPassword ? "text" : "password"} // CAMBIA EL TIPO DE INPUT
                name="password2"
                id="password2"
                value={password2}
                onChange={handleChangePass2}
              />
              <button
                type="button"
                className="password-toggle-button" // Agrega estilos a esta clase
                onClick={togglePasswordVisibility}
              >
                <img
                  src={`${ENV.URL}/icons/${showPassword ? 'eye-regular.svg' : 'eye-slash-regular.svg'}`}
                  className="pass-btn-icon"
                />                
              </button>
            </div>
            <div className="password-input-message">
              {passwordMatchError && <label className="form_error_label">{passwordMatchError}</label>}
            </div>
          </div>
        </div>

        <button type="submit" className="form_btn" disabled={isSubmitDisabled}>
          Guardar cambios
        </button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mensaje del sistema"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
          },
        }}
      >
        <h2>Información</h2>
        <p>{modalMessage}</p>
        <button className="form_btn" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </>
  );
}

export default ResetPassword;