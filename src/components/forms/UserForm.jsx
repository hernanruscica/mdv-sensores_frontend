import { useEffect, useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

function UserForm({ id }) {
  const [user, setUser] = useState({
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    email: "",
    telefono: "",
    foto: "",
  });
  const [profileImage, setProfileImage] = useState(""); // Imagen de perfil actual
  const [newImage, setNewImage] = useState(""); // Nueva imagen seleccionada
  const apiClient = createApiClient();
  const apiClientMultipart = createApiClient("multipart/form-data");
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await apiClient.get(`/api/users/${id}`);
      setUser(response.data.user);
      setProfileImage(response.data.user.foto); // Asigna la imagen de perfil actual
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();
    // Verifica que los campos del usuario tengan valores válidos
    formData.append("nombre_1", user.nombre_1 || "");
    formData.append("nombre_2", user.nombre_2 || "");
    formData.append("apellido_1", user.apellido_1 || "");
    formData.append("apellido_2", user.apellido_2 || "");
    formData.append("email", user.email || "");
    formData.append("telefono", user.telefono || "");
    formData.append("foto", newImage || "");

    try {
      setLoading(true);

      const response = await apiClientMultipart.put(
        `/api/users/${id}`,
        formData
      );

      setLoading(false);
      //console.log(response);
      if (response.status == 200) {
        setModalMessage("Usuario actualizado con éxito");
        setModalIsOpen(true); // Abrir el modal
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setModalMessage("Error al actualizar el usuario");
      setModalIsOpen(true); // Abrir el modal en caso de error
    }
  };

  if (loading) {
    return <div>Cargando ...</div>;
  }
  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/usuarios/${id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <CardImageLoadingPreview
          imageFileName={profileImage}
          setNewImageHandler={setNewImage}
        />
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="nombre_1">Nombre 1:</label>
            <input
              type="text"
              name="nombre_1"
              id="nombre_1"
              value={user.nombre_1}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="nombre_2">Nombre 2:</label>
            <input
              type="text"
              name="nombre_2"
              id="nombre_2"
              value={user.nombre_2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="apellido_1">Apellido 1:</label>
            <input
              type="text"
              name="apellido_1"
              id="apellido_1"
              value={user.apellido_1}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="apellido_2" >
              Apellido 2:
            </label>
            <input
              type="text"
              name="apellido_2"
              id="apellido_2"
              value={user.apellido_2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="telefono">Telefono:</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              value={user.telefono}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="form_btn">
          Guardar cambios
        </button>
      </form>
      {/* Modal para mostrar mensajes al usuario */}
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

export default UserForm;
