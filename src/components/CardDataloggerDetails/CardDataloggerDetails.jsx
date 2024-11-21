import React from 'react';
import './CardDataloggerDetails.css';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";

const CardDataloggerDetails = (props) => {
    
    const { datalogger, type, locations, dataloggers, channels, alarms } = props;        
     const analogChannelsByLocationQty =  channels.filter(channel => channel.nombre_columna.startsWith('a')).length; 
     const digitalChannelsByLocationQty =  channels.filter(channel => channel.nombre_columna.startsWith('d')).length;    
    //console.log(activeAlarms)   


  return (    
    <div className="card-datalogger-details">
      <div className="datalogger-details__container">
        <img src={`${ENV.IMAGES_URL}/${datalogger.foto}`} 
          className='datalogger-details__container__image'
          alt={`Foto de ${datalogger.nombre}`}
          title={`Foto de ${datalogger.nombre}`} 
        />
      </div>
      <div className="datalogger-details__info">
        <h2 className="card-datalogger-details__info__title">        
          {datalogger.nombre}
        </h2>
        <p className="card-datalogger-details__paragraph">
          {datalogger.descripcion}
        </p>
        <p className="card-datalogger-details__paragraph">
          <strong>Creado el </strong>{formatDate(datalogger.fecha_creacion, 'short')}
        </p>              
        <p className="card-datalogger-details__paragraph">
          <strong>canales conectados : </strong>{analogChannelsByLocationQty || 0} analogicos y {digitalChannelsByLocationQty || 0}  digitales
        </p>
        <p className="card-datalogger-details__paragraph">
            <strong>Alarmas programadas : </strong>          
             {
             (alarms.length > 0) ?
             (<CardBtnSmall
               title={`Ver ${alarms.length} alarmas`}
               key={`ver_alarmas_ubicacion_${datalogger.id}`}
               url={`${ENV.URL}/panel/dataloggers/${datalogger.id}/alarmas`}
             />  ) :
             ("no hay alarmas")       
             }
          </p>
          <div className="card-datalogger-details__btn-container">
          {/* text, icon, type, url, onClick */}
            <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/dataloggers/${datalogger.id}/edicion`}/>
            <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
          </div>
      </div>
      
    </div>
  );
};

export default CardDataloggerDetails;

