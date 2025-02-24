import {useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";
import { useDashboard } from "../../context/DashboardContext.jsx";

import Modal from "react-modal";
Modal.setAppElement("#root");

function CreateDataloggerForm() {
 
 const [profileImage, setProfileImage] = useState("default_datalogger.webp"); // Imagen de perfil por default
 const [newImage, setNewImage] = useState(""); // Nueva imagen seleccionada
 const apiClientMultipart = createApiClient("multipart/form-data");
 //const apiClient = createApiClient();
 const [loading, setLoading] = useState(false);
 const [modalIsOpen, setModalIsOpen] = useState(false);
 const [modalMessage, setModalMessage] = useState("");
 const navigate = useNavigate();
 const {locations } = useDashboard();  
 
 const [ selectedLocation, setSelectedLocation] = useState(locations[0].ubicaciones_id);
 
 const [datalogger, setDatalogger] = useState({
   direccion_mac: "",
   nombre: "",
   descripcion: "",
   foto: "",
   nombre_tabla: "",
   ubicacion_id: locations[0].ubicaciones_id    
 });

  const handleChange = (e) => {
    //console.log(`${e.target.name} : '${e.target.value}'`)
    setDatalogger({
      ...datalogger,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();
    // Verifica que los campos del usuario tengan valores válidos
    formData.append("direccion_mac", datalogger.direccion_mac || "");
    formData.append("nombre", datalogger.nombre || "");
    formData.append("descripcion", datalogger.descripcion || "");
    formData.append("foto", newImage || "default_datalogger.webp");
    formData.append("nombre_tabla", datalogger.nombre_tabla || "");
    formData.append("ubicacion_id", datalogger.ubicacion_id || "");    
    
    try {           
      setLoading(true)      
      const response = await apiClientMultipart.post(
        '/api/dataloggers',
        formData
      );      
      setLoading(false);        
      
      if (response.status == 201) {        
        setModalMessage(`Datalogger ${datalogger.nombre} creado con éxito.`);
        setModalIsOpen(true); 
      }

      if (response.status == 400) {
        setModalMessage("El datalogger ya existe!");
        setModalIsOpen(true); 
      }
    } catch (error) {
      //console.error("Error al crear el usuario:", error);
      setModalMessage("Error al crear el datalogger");
      setModalIsOpen(true); 
    }   
  };

  if (loading) {
    return <div>Cargando ...</div>;
  }
  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/dataloggers`);
  };
// console.log(userLocation.find(userLoc => userLoc.ubicaciones_id == selectedLocation));
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
            <label htmlFor="direccion_mac" >Direccion MAC:</label>
            <input
              type="text"
              name="direccion_mac"
              id="direccion_mac"
              value={datalogger.direccion_mac}
              onChange={handleChange}
            />
          </div>
        </div>        
        
        <h3>Ubicación del datalogger:</h3>
        <div className="form_input_group">          
          <div className="form_input">
            <label htmlFor="location">ubicación:</label>
            <select name="ubicacion_id" id="location" value={datalogger.ubicacion_id} onChange={handleChange}>
              {locations.map((location) => (
                <option value={location.ubicaciones_id} key={location.ubicaciones_id}>{location.ubicaciones_nombre}</option>
              ))
              }
            </select>
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

export default CreateDataloggerForm;
