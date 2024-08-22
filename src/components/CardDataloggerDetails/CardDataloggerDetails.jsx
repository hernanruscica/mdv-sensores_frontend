import React from 'react';
import './CardDataloggerDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';

const CardDataloggerDetails = (props) => {
    //const {} = useDashboard();
    const { datalogger, type, locations, dataloggers, channels, alarms } = props;    
    // const location = locations.find(location => location.ubicaciones_id == id);
            
    // //const activeAlarms = alarms.filter(alarm => alarm.estado = '1');   
     //const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id);

     //console.log(channels) // datalogger_id
     //const channelsByCurrentDatalogger = channels.filter(channel => channel.datalogger_id == datalogger.id);
     const analogChannelsByLocationQty =  channels.filter(channel => channel.nombre_columna.startsWith('a')).length; 
     const digitalChannelsByLocationQty =  channels.filter(channel => channel.nombre_columna.startsWith('d')).length;    
    //console.log(activeAlarms)   


  return (    
    <div className="card-location-details">
      <div className="location-details__container">
        <img src={`https://mdv-sensores-rltk.onrender.com/images/${datalogger.foto}`} 
          className='location-details__container__image'
          alt={`Foto de ${datalogger.nombre}`}
          title={`Foto de ${datalogger.nombre}`} 
        />
      </div>
      <div className="location-details__info">
        <h2 className="card-location-details__info__title">        
          {datalogger.nombre}
        </h2>
        <p className="card-location-details__paragraph">
          {datalogger.descripcion}
        </p>
        <p className="card-location-details__paragraph">
          <strong>Fecha de creacion : </strong>{datalogger.fecha_creacion}
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
               key={`ver_alarmas_ubicacion_${datalogger.id}`}
               url={`${ENV.URL}/panel/alarmas/dataloggers/${datalogger.id}`}
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

export default CardDataloggerDetails;

