import React from 'react';
import './CardUserDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CardUserDetails = (props) => {
    //const {} = useDashboard();
    const { alarms, currentUser } = props;  
    const {user} = useAuth();                 
    
    //console.log(user)   

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
           {/* text, icon, type, url, onClick */}
             {(user.espropietario == 1 || user.id == currentUser.id) 
             ?<BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/usuarios/${currentUser.id}/edicion`}/>
              : ''}
              
              {(user.espropietario == 1) ? <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/> : ''}
              

           </div>
       </div>
      
     </div>
   );
};

export default CardUserDetails;

