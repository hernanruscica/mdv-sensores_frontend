import {useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import CardImageLoadingPreview from "../CardImageLoadingPreview/CardImageLoadingPreview.jsx";
import "./form.css";
import { useDashboard } from "../../context/DashboardContext";

import Modal from "react-modal";
Modal.setAppElement("#root");

function CreateUserForm() {
  const [user, setUser] = useState({
    foto: "",
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    email: "",
    telefono: "",    
    dni:"",
    password:"",
    estado:"",
    direcciones_id: ""
  });

  const [profileImage, setProfileImage] = useState("default_avatar.png"); // Imagen de perfil actual
  const [newImage, setNewImage] = useState(""); // Nueva imagen seleccionada
  const apiClientMultipart = createApiClient("multipart/form-data");
  const apiClient = createApiClient();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const {locations, roles, userLocation} = useDashboard();  
  const [ selectedLocationRol, setSelectedLocationRol] = useState(7);
  const [ selectedLocation, setSelectedLocation] = useState(locations[0].ubicaciones_id);
  const [currentRoles, setCurrentRoles]  = useState(roles.filter(roles => roles.id <= 8))

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  const handleSelectLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    const permissionLocation = userLocation.find(userLoc => userLoc.ubicaciones_id == e.target.value)
    //console.log(`user permissions on locatonId: ${e.target.value} =  ${permissionLocation.usuarios_roles_id}`)
    const filteredRoles = roles.filter(roles => roles.id < permissionLocation.usuarios_roles_id);
    setCurrentRoles(filteredRoles);
    //console.log(filteredRoles)
  }

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
    formData.append("dni", user.dni || "");
    formData.append("password", user.password || "P4s5_W0rD*joD1d4+joD1d4_W0rD.P4s5");
    formData.append("estado", user.estado || "0");
    formData.append("direcciones_id", user.direcciones_id || "1");
    formData.append("foto", newImage || "default_avatar.png");
    
    try {           
      setLoading(true)      
      const response = await apiClientMultipart.post(
        '/api/users',
        formData
      );      
      
      if (response.status == 201) {
        const formData2 = new FormData();
        formData2.append("ubicaciones_id", selectedLocation);
        formData2.append("roles_id", selectedLocationRol);
        formData2.append("usuarios_id", response.data.user.id);
        const response2 = await apiClient.post(`/api/locationsusers`, formData2)
        //console.log(response2);
        setLoading(false);        
        setModalMessage(`Usuario ${user.nombre_1} ${user.apellido_1} creado con éxito.\nCorreo de confirmacion enviado a ${user.email}`);
        setModalIsOpen(true); 
      }else{
        setLoading(false); 
      }
      if (response.status == 400) {
        setModalMessage("Usuario ya existe!");
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
    navigate(`/panel/usuarios`);
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
            <label htmlFor="apellido_2" >Apellido 2:</label>
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
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="dni">dni:</label>
            <input
              type="text"
              name="dni"
              id="dni"
              value={user.dni}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3>Rol del usuario en una ubicación:</h3>
        <div className="form_input_group">          
          <div className="form_input">
            <label htmlFor="location">ubicación:</label>
            <select name="location" id="location" value={selectedLocation} onChange={handleSelectLocationChange}>
              {locations.map((location) => (
                <option value={location.ubicaciones_id} key={location.ubicaciones_id}>{location.ubicaciones_nombre}</option>
              ))
              }
            </select>
          </div>      
          <div className="form_input">
            <label htmlFor="rol">Rol:</label>
            <select name="rol" id="rol" value={selectedLocationRol} onChange={e => setSelectedLocationRol(e.target.value)}>
              {currentRoles.map((rol) => (
                <option value={rol.id} key={rol.id}>{rol.nombre}</option>
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

export default CreateUserForm;
