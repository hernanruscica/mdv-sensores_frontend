import { useEffect, useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

function DataloggerForm({ id }) {
  const [datalogger, setDatalogger] = useState({
    nombre: "",
    descripcion: "",
    nombre_tabla: "",
    direccion_mac: "",
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
    const fetchDatalogger = async () => {
      setLoading(true);
      const response = await apiClient.get(`/api/dataloggers/${id}`);
      //console.log(response.data.datalogger);
      setDatalogger(response.data.datalogger);
      setProfileImage(response.data.datalogger.foto); // Asigna la imagen de perfil actual
      setLoading(false);
    };
    fetchDatalogger();
  }, [id]);

  const handleChange = (e) => {
    setDatalogger({
      ...datalogger,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();

    formData.append("nombre", datalogger.nombre || "");
    formData.append("descripcion", datalogger.descripcion || "");
    formData.append("nombre_tabla", datalogger.nombre_tabla || "");
    formData.append("direccion_mac", datalogger.direccion_mac || "");
    formData.append("foto", newImage || "");

    try {
      setLoading(true);

      const response = await apiClientMultipart.put(
        `/api/dataloggers/${id}`,
        formData
      );
      setLoading(false);

      if (response.status == 200) {
        setModalMessage("datalogger actualizado con éxito");
        setModalIsOpen(true); // Abrir el modal
      }
    } catch (error) {
      console.error("Error al actualizar el datalogger:", error);
      setModalMessage("Error al actualizar el datalogger");
      setModalIsOpen(true); // Abrir el modal en caso de error
    }
  };

  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/dataloggers/${id}`);
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
              value={datalogger.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={datalogger.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="nombre_tabla">Nombre de la tabla:</label>
            <input
              type="text"
              name="nombre_tabla"
              id="nombre_tabla"
              value={datalogger.nombre_tabla}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="direccion_mac" >
              Direccion MAC:
            </label>
            <input
              type="text"
              name="direccion_mac"
              id="direccion_mac"
              value={datalogger.direccion_mac}
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

export default DataloggerForm;
