import React, {useEffect, useState} from 'react';
import './CardUserDetails.css';
import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

import Modal from "react-modal";
Modal.setAppElement("#root");

const CardUserDetails = (props) => {
  
  const { alarms, currentUser, deleteUserApi } = props;  
  const {user} = useAuth();                 
  const { userLocation } = useDashboard();
  const [ userHasSomeAdminRole, setUserHasSomeAdminRole] = useState(false);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setModalIsOpen(false); 
    navigate('/panel/usuarios');
  };
  const openModal = (e) => {
    e.preventDefault();
    setModalMessage(`Desea eliminar al usuario ${currentUser.nombre_1} ${currentUser.apellido_1} con DNI.: ${currentUser.dni} ?`);
    setModalIsOpen(true);
  }
  const deleteUser = async (e) => {
    e.preventDefault();
    //console.log(`Delete user ${currentUser.nombre_1} ${currentUser.apellido_1} con id ${currentUser.id} CONFIRMED!`);
    setModalIsOpen(false); 

    //Delete user action:
    const userDeleted = await deleteUserApi(currentUser.id);
    //console.log(userDeleted);

    navigate('/panel/usuarios');
  }
  
  useEffect(() => {
    setUserHasSomeAdminRole(userLocation.some(ul => ul.usuarios_roles_id >= 8));
  }, [userLocation]);
//console.log(currentUser);
   return (    
     <div className="card-user-details">
       <div className="user-details__container">
         <img src={`${ENV.IMAGES_URL}/${currentUser.foto}`} 
           className='user-details__container__image'
           alt={`Foto de ${currentUser.nombre_1} ${currentUser.apellido_1}`}
           title={`Foto de ${currentUser.nombre_1} ${currentUser.apellido_1}`} 
         />
       </div>
       <div className="user-details__info">
         <h2 className="card-user-details__info__title">        
         {`${currentUser.nombre_1} ${currentUser.apellido_1}`}
         </h2>         
         <p className="card-user-details__paragraph">
          📅 <strong>Perfil creado el </strong>{formatDate(currentUser.fecha_creacion, 'short')}
         </p>
         <p className="card-user-details__paragraph">
          📧 <strong>Correo electronico : </strong> {currentUser.email}
          </p>
         <p className="card-user-details__paragraph">
          ⏰ <strong>Alarmas programadas : </strong>          
              {
              (alarms.length > 0) ?
              (<CardBtnSmall
                title={`Ver ${alarms.length} alarmas`}
                key={`ver_alarmas_usuario_${currentUser.id}`}
                url={`${ENV.URL}/panel/usuarios/${currentUser.id}/alarmas`}
              />  ) :
              ("no hay alarmas")       
              }
           </p>
           <div className="card-user-details__btn-container">
           
             {(userHasSomeAdminRole || user.id == currentUser.id)              
             ?<BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/usuarios/${currentUser.id}/edicion`}/>
              : ''}
              
              {(userHasSomeAdminRole) ? <BtnCallToAction onClick={openModal} text="eliminar" icon='trash-alt-regular.svg' type="danger"/> : ''}
              

           </div>
       </div>

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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1em'
                  },                 
                }}
              >
                <h2>Confima eliminar?</h2>
                <p>{modalMessage}</p>
                <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>                
                  <BtnCallToAction onClick={closeModal} text="No" icon="arrow-left-solid.svg" type="normal"/>
                  <BtnCallToAction onClick={deleteUser} text="Si" icon="trash-alt-regular.svg" type="danger"/>                
                </div>
              </Modal>
      
     </div>
   );
};

export default CardUserDetails;

