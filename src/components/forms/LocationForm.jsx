import { useEffect, useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

function LocationForm({ id }) {
  const [location, setLocation] = useState({
    nombre: "",
    descripcion: "",
    telefono: "",
    email: "",
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
    const fetchLocation = async () => {
      setLoading(true);
      const response = await apiClient.get(`/api/locations/${id}`);
      setLocation(response.data.location);
      setProfileImage(response.data.location.foto); // Asigna la imagen de perfil actual
      setLoading(false);
    };
    fetchLocation();
  }, [id]);

  const handleChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();

    formData.append("nombre", location.nombre || "");
    formData.append("descripcion", location.descripcion || "");
    formData.append("telefono", location.telefono || "");
    formData.append("email", location.email || "");
    formData.append("foto", newImage || "");

    try {
      setLoading(true);

      const response = await apiClientMultipart.put(
        `/api/locations/${id}`,
        formData
      );
      setLoading(false);

      if (response.status == 200) {
        setModalMessage("ubicacion actualizada con éxito");
        setModalIsOpen(true); // Abrir el modal
      }
    } catch (error) {
      console.error("Error al actualizar la ubicacion:", error);
      setModalMessage("Error al actualizar la ubicacion");
      setModalIsOpen(true); // Abrir el modal en caso de error
    }
  };

  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/ubicaciones/${id}`);
  };
  if (loading) {
    return <div>Cargando ...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <CardImageLoadingPreview
          imageFileName={profileImage}
          setNewImageHandler={setNewImage}
        />
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={location.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={location.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="telefono">Telefono:</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              value={location.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="email" >
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={location.email}
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

export default LocationForm;
