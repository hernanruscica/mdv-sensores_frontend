import React from 'react';
import './CardLocationDetails.css';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";

const CardLocationDetails = (props) => {
    
    const { id, type, location, dataloggers, channels, alarms } = props;    
     
    const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id);
    const analogChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('a')).length; 
    const digitalChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('d')).length;    

    //console.log(dataloggers);
  return (    
    <div className="card-location-details">
      <div className="location-details__container">
        <img src={`${ENV.IMAGES_URL}/${location.foto}`} 
          className='location-details__container__image'
          alt={`Foto de ${location.nombre}`}
          title={`Foto de ${location.nombre}`} 
        />
      </div>
      <div className="location-details__info">
        <h2 className="card-location-details__info__title">        
          {location.nombre}
        </h2>
        <p className="card-location-details__paragraph">
          {location.descripcion}
        </p>
        <p className="card-location-details__paragraph">
          <strong>Dataloggers conectados : </strong>
          {dataloggers.map((datalogger) => (
            <CardBtnSmall
              title={datalogger.nombre}
              key={`datalogger-${datalogger.id}`}
              url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
            />
          ))}
        </p>
        <p className="card-location-details__paragraph">
          {location.ubicaciones_descripcion}
        </p>
        <p className="card-location-details__paragraph">
          <strong>Creada el </strong>{formatDate(location.fecha_creacion, 'short')}
        </p>
        <p className="card-location-details__paragraph">
          <strong>canales conectados : </strong>{analogChannelsByLocationQty || 0} analogicos y {digitalChannelsByLocationQty || 0}  digitales
        </p>
        <p className="card-location-details__paragraph">
            <strong>Alarmas programadas : </strong>          
             {
             (alarms.length > 0) ?
             (<CardBtnSmall
               title={`Ver ${alarms.length} alarmas`}
               key={`ver_alarmas_ubicacion_${id}`}
               url={`${ENV.URL}/panel/alarmas/ubicaciones/${id}`}
             />  ) :
             ("no hay alarmas")       
             }
          </p>
          <div className="card-locatin-details__btn-container">
          {/* text, icon, type, url, onClick */}
            <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/ubicaciones/${id}/edicion`}/>
            <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
          </div>
      </div>
      
    </div>
  );
};

export default CardLocationDetails;

