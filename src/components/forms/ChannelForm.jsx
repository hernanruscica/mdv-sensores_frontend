import { useEffect, useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

function ChannelForm({ id, dataloggerId }) {
  const [channel, setChannel] = useState({
    nombre: "",
    descripcion: "",
    nombre_columna: "",
    tiempo_a_promediar: "",
    multiplicador: "",
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
    const fetchChannel = async () => {
      setLoading(true);
      const response = await apiClient.get(`/api/channels/${id}`);
      
      setChannel(response.data.channel);
      setProfileImage(response.data.channel.foto); // Asigna la imagen de perfil actual
      setLoading(false);
    };
    fetchChannel();
  }, [id]);

  const handleChange = (e) => {
    setChannel({
      ...channel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();

    formData.append("nombre", channel.nombre || "");
    formData.append("descripcion", channel.descripcion || "");
    formData.append("nombre_columna", channel.nombre_columna || "");
    formData.append("tiempo_a_promediar", channel.tiempo_a_promediar || "");
    formData.append("multiplicador", channel.multiplicador || "");
    formData.append("foto", newImage || "");

    try {
      setLoading(true);

      const response = await apiClientMultipart.put(
        `/api/channels/${id}`,
        formData
      );
      setLoading(false);

      if (response.status == 200) {
        setModalMessage("canal actualizado con éxito");
        setModalIsOpen(true); // Abrir el modal
      }
    } catch (error) {
      console.error("Error al actualizar el canal:", error);
      setModalMessage("Error al actualizar el canal");
      setModalIsOpen(true); // Abrir el modal en caso de error
    }
  };

  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/dataloggers/${dataloggerId}/canales/${id}`);
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
              value={channel.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={channel.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="nombre_columna">Nombre de la columna:</label>
            <input
              type="text"
              name="nombre_columna"
              id="nombre_columna"
              value={channel.nombre_columna}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="tiempo_a_promediar" l>
                Tiempo a promediar (min):
            </label>
            <input
              type="text"
              name="tiempo_a_promediar"
              id="tiempo_a_promediar"
              value={channel.tiempo_a_promediar}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">
        <div className="form_input">
            <label htmlFor="multiplicador" l>
                Multiplicador:
            </label>
            <input
              type="text"
              name="multiplicador"
              id="multiplicador"
              value={channel.multiplicador}
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

export default ChannelForm;
