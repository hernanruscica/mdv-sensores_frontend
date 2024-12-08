import React from 'react';
import './CardUserDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";

const CardUserDetails = (props) => {
    //const {} = useDashboard();
    const { user, type, dataloggers, channels, alarms } = props;                   
    
    //console.log(user)   

   return (    
     <div className="card-user-details">
       <div className="user-details__container">
         <img src={`${ENV.IMAGES_URL}/${user.foto}`} 
           className='user-details__container__image'
           alt={`Foto de ${user.nombre_1} ${user.apellido_1}`}
           title={`Foto de ${user.nombre_1} ${user.apellido_1}`} 
         />
       </div>
       <div className="user-details__info">
         <h2 className="card-user-details__info__title">        
         {`${user.nombre_1} ${user.apellido_1}`}
         </h2>         
         <p className="card-user-details__paragraph">
           <strong>Perfil creado el </strong>{formatDate(user.fecha_creacion, 'short')}
         </p>
         <p className="card-user-details__paragraph">
            <strong>Correo electronico : </strong> {user.email}
          </p>
         <p className="card-user-details__paragraph">
             <strong>Alarmas programadas : </strong>          
              {
              (alarms.length > 0) ?
              (<CardBtnSmall
                title={`Ver ${alarms.length} alarmas`}
                key={`ver_alarmas_usuario_${user.id}`}
                url={`${ENV.URL}/panel/usuarios/${user.id}/alarmas`}
              />  ) :
              ("no hay alarmas")       
              }
           </p>
           <div className="card-user-details__btn-container">
           {/* text, icon, type, url, onClick */}
             <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/usuarios/${user.id}/edicion`}/>
             <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
           </div>
       </div>
      
     </div>
   );
};

export default CardUserDetails;

