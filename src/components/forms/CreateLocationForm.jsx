import {useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";
import { useDashboard } from "../../context/DashboardContext";

import Modal from "react-modal";
Modal.setAppElement("#root");

function CreateLocationForm() {
  const [location, setLocation] = useState({    
    nombre: "",
    descripcion: "",
    foto: "",
    telefono: "",
    email: "",       
    direcciones_id: Date.now().toString()
  });

  const [profileImage, setProfileImage] = useState("default_location.png"); // Imagen de perfil actual
  const [newImage, setNewImage] = useState(""); // Nueva imagen seleccionada
  const apiClientMultipart = createApiClient("multipart/form-data");
  const apiClient = createApiClient();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  
  
  const {locations} = useDashboard();  
  
  const handleChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  /*
  const [ selectedLocationRol, setSelectedLocationRol] = useState(7);
  const [ selectedLocation, setSelectedLocation] = useState(locations[0].ubicaciones_id);
  const [currentRoles, setCurrentRoles]  = useState(roles.filter(roles => roles.id < 8))
 
  const handleSelectLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    const permissionLocation = userLocation.find(userLoc => userLoc.ubicaciones_id == e.target.value)
    //console.log(`user permissions on locatonId: ${e.target.value} =  ${permissionLocation.usuarios_roles_id}`)
    const filteredRoles = roles.filter(roles => roles.id < permissionLocation.usuarios_roles_id);
    setCurrentRoles(filteredRoles);
    //console.log(filteredRoles)
  }
*/

  const handleSubmit = async (e) => {
    e.preventDefault();    
    // Crear formData para enviar los datos incluyendo la imagen
    const formDataAddress = new FormData();
   
    formDataAddress.append("calle", "Av. Siempre Viva");
    formDataAddress.append("numero", "155");
    formDataAddress.append("localidad", "1212");
    formDataAddress.append("partido", "48416987");
    formDataAddress.append("provincia", "02");
    formDataAddress.append("codigo_postal", "66");
    formDataAddress.append("latitud", "-31.5375");
    formDataAddress.append("longitud", "-68.5364");    
    try {
      setLoading(true)    
      const response0 = await apiClient.post(
        '/api/addresses',
        formDataAddress
      );
      console.log(response0)
      if (response0.status !== 201) {
        return;
      }else{
        console.log(response0.data.Address.id);
        location.direcciones_id = response0.data.Address.id;
      }

    } catch (error) {
      
    }finally{
      setLoading(false);
    }
    
    const formData = new FormData();
    // Verifica que los campos de la ubicacion tengan valores válidos

    formData.append("nombre", location.nombre || "");
    formData.append("descripcion", location.descripcion || "");
    formData.append("foto", newImage || "default_location.png");
    formData.append("telefono", location.telefono || "");
    formData.append("email", location.email || "");
    formData.append("direcciones_id", location.direcciones_id || "1");    
    
    try {           
      setLoading(true)    
      
      const response = await apiClientMultipart.post(
        '/api/locations',
        formData
      );     
      setLoading(false);
      if (response.status == 201) {   
        console.log(response.status)
        setModalMessage(`Ubicacion ${location.nombre} creada con éxito.`);        
        setModalIsOpen(true); 
      }

      if (response.status == 400) {
        setModalMessage("Ubicacion ya existe!");
        setModalIsOpen(true); 
      }
    } catch (error) {
      //console.error("Error al crear el usuario:", error);
      setModalMessage("Error al crear el usuario");
      setModalIsOpen(true); 
    }   
  };

  if (loading) {
    return <div>Cargando ...</div>;
  }
  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/ubicaciones`);
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
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

export default CreateLocationForm;
