import React from 'react';
import './CardUserDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';

const CardUserDetails = (props) => {
    //const {} = useDashboard();
    const { user, type, dataloggers, channels, alarms } = props;       
            
    //const activeAlarms = alarms.filter(alarm => alarm.estado = '1');   
    //const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id);
    // const analogChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('a')).length; 
    // const digitalChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('d')).length;    
    console.log(user)   


   return (    
     <div className="card-location-details">
       <div className="location-details__container">
         <img src={`https://mdv-sensores-rltk.onrender.com/images/${user.foto}`} 
           className='location-details__container__image'
           alt={`Foto de ${user.nombre_1} ${user.apellido_1}`}
           title={`Foto de ${user.nombre_1} ${user.apellido_1}`} 
         />
       </div>
       <div className="location-details__info">
         <h2 className="card-location-details__info__title">        
         {`${user.nombre_1} ${user.apellido_1}`}
         </h2>         
         <p className="card-location-details__paragraph">
           <strong>Fecha de creacion : </strong>{user.fecha_creacion}
         </p>
         <p className="card-location-details__paragraph">
            <strong>Correo electronico : </strong> {user.email}
          </p>
         <p className="card-location-details__paragraph">
             <strong>Alarmas programadas : </strong>          
              {
              (alarms.length > 0) ?
              (<CardBtnSmall
                title={`Ver ${alarms.length} alarmas`}
                key={`ver_alarmas_usuario_${user.id}`}
                url={`${ENV.URL}/panel/alarmas/usuarios/${user.id}`}
              />  ) :
              ("no hay alarmas")       
              }
           </p>
           <div className="card-locatin-details__btn-container">
           {/* text, icon, type, url, onClick */}
             <BtnCallToAction text="editar" icon='edit-regular.svg' url={`${ENV.URL}/panel/ubicaciones/`}/>
             <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
           </div>
       </div>
      
     </div>
   );
};

export default CardUserDetails;

