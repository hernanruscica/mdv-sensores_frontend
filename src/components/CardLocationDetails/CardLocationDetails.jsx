import React, {useState,useEffect} from 'react';
import './CardLocationDetails.css';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CardLocationDetails = (props) => {
    
    const { id, type, location,  dataloggers, channels, alarms } = props;    
     
    const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id);
    const analogChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('a')).length; 
    const digitalChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('d')).length;   
    const {user} = useAuth();    

    //console.log(location);
  return (    
    <div className="card_location_details">
      <div className="card_location_details__container">
        <img src={`${ENV.IMAGES_URL}/${location.ubicaciones_foto}`} 
          className='location-details__container__image'
          alt={`Foto de ${location.ubicaciones_nombre}`}
          title={`Foto de ${location.ubicaciones_nombre}`} 
        />
      </div>
      <div className="card_location_details__info">
        <h2 className="card_location_details__info__title">        
          {location.ubicaciones_nombre}
        </h2>
        <p className="card_location_details__paragraph">
        📝{location.ubicaciones_descripcion}
        </p>
        <p className="card_location_details__paragraph">
        🏢<strong>Direción: </strong>{`${location.ubicaciones_calle} ${location.ubicaciones_calle_numero}`}
        </p>
        <p className="card_location_details__paragraph">
        📞<strong>Telefono: </strong>{location.ubicaciones_tel} - 📧 <strong>Correo: </strong> {location.ubicaciones_email}
        </p>
        <p className="card_location_details__paragraph">
        🌡️<strong>Dataloggers conectados : </strong>
          {dataloggers.map((datalogger) => (
            <CardBtnSmall
              title={datalogger.nombre}
              key={`datalogger-${datalogger.id}`}
              url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
            />
          ))}
        </p>
        <p className="card_location_details__paragraph">
        📝 {location.ubicaciones_descripcion}
        </p>
        <p className="card_location_details__paragraph">
        📅<strong>Creada el </strong>{formatDate(location.fecha_creacion, 'short')}
        </p>
        <p className="card_location_details__paragraph">
        📈 <strong>canales conectados : </strong>{analogChannelsByLocationQty || 0} analogicos y {digitalChannelsByLocationQty || 0}  digitales
        </p>
        <p className="card_location_details__paragraph">
        ⏰ <strong>Alarmas programadas : </strong>          
             {
             (alarms.length > 0) ?
             (<CardBtnSmall
               title={`Ver ${alarms.length} alarmas`}
               key={`ver_alarmas_ubicacion_${id}`}
               url={`${ENV.URL}/panel/ubicaciones/${id}/alarmas`}
             />  ) :
             ("no hay alarmas")       
             }
          </p>
          <div className="card_location_details__btn-container">
          {/* text, icon, type, url, onClick */}
            {(user.espropietario == 1)?
            <>
              <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/ubicaciones/${id}/edicion`}/>
              <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
            </>
            : ''}

          </div>
      </div>
      
    </div>
  );
};

export default CardLocationDetails;

