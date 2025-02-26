import {useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";
//import { useDashboard } from "../../context/DashboardContext.jsx";

import Modal from "react-modal";
Modal.setAppElement("#root");

function CreateChannelForm({dataloggerId}) {
 
 const [profileImage, setProfileImage] = useState("default_channel.png"); // Imagen de perfil por default
 const [newImage, setNewImage] = useState(""); // Nueva imagen seleccionada
 const apiClientMultipart = createApiClient("multipart/form-data");
 //const apiClient = createApiClient();
 const [loading, setLoading] = useState(false);
 const [modalIsOpen, setModalIsOpen] = useState(false);
 const [modalMessage, setModalMessage] = useState("");
 const navigate = useNavigate();
 //const {dataloggers } = useDashboard();   

 const [channel, setChannel] = useState({
   datalogger_id: dataloggerId,
   nombre: "",
   descripcion: "",
   nombre_columna: "",
   tiempo_a_promediar: "720",
   foto: "",
   multiplicador: "1"
 });

  const handleChange = (e) => {
    //console.log(`${e.target.name} : '${e.target.value}'`)
    setChannel({
      ...channel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();
    // Verifica que los campos del usuario tengan valores válidos
    formData.append("datalogger_id", channel.datalogger_id || "");
    formData.append("nombre", channel.nombre || "");
    formData.append("descripcion", channel.descripcion || "");
    formData.append("nombre_columna", channel.nombre_columna || "");
    formData.append("tiempo_a_promediar", channel.tiempo_a_promediar || "");    
    formData.append("foto", newImage || "default_channel.webp");
    formData.append("multiplicador", channel.multiplicador || "");    
    
    try {           
      setLoading(true)      
      const response = await apiClientMultipart.post(
        '/api/channels',
        formData
      );      
      setLoading(false);        
      
      if (response.status == 201) {        
        setModalMessage(`Canal ${channel.nombre} creado con éxito.`);
        setModalIsOpen(true); 
      }

      if (response.status == 400) {
        setModalMessage("El canal ya existe!");
        setModalIsOpen(true); 
      }
    } catch (error) {
      //console.error("Error al crear el usuario:", error);
      setModalMessage("Error al crear el canal");
      setModalIsOpen(true); 
    }   
  };

  if (loading) {
    return <div>Cargando ...</div>;
  }
  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/dataloggers/${dataloggerId}/canales`);
  };
//console.log(dataloggerId);
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
            <label htmlFor="tiempo_a_promediar" >Tiempo a promediar (Minutos):</label>
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
            <label htmlFor="multiplicador" >Multiplicador:</label>
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

export default CreateChannelForm;
