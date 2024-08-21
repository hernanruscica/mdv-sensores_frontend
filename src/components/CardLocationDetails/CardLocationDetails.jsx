import React from 'react';
import './CardLocationDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';

const CardLocationDetails = (props) => {
    //const {} = useDashboard();
    const { id, type, locations, dataloggers, channels, alarms } = props;    
    const location = locations.find(location => location.ubicaciones_id == id);
    const dataloggersByLocation = dataloggers.filter(datalogger => datalogger.ubicacion_id == id);         
    const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id);
    const analogChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('a')).length; 
    const digitalChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('d')).length;      
    console.log(dataloggersByLocation, alarms)   


  return (    
    <div className="card-location-details">
      <div className="location-details__container">
        <img src={`https://mdv-sensores-rltk.onrender.com/images/${location.ubicaciones_foto}`} 
          className='location-details__container__image'
          alt={`Foto de ${location.ubicaciones_nombre}`}
          title={`Foto de ${location.ubicaciones_nombre}`} 
        />
      </div>
      <div className="location-details__info">
        <h2 className="card-location-details__info__title">        
          {location.ubicaciones_nombre}
        </h2>
        <p className="card-location-details__paragraph">
          <strong>Dataloggers conectados : </strong>
          {dataloggersByLocation.map((datalogger) => (
            <CardBtnSmall
              title={datalogger.nombre}
              key={`datalogger-${datalogger.id}`}
              url={`${ENV.URL}/panel/datalogger/${datalogger.id}`}
            />
          ))}
        </p>
        <p className="card-location-details__paragraph">
          {location.ubicaciones_descripcion}
        </p>
        <p className="card-location-details__paragraph">
          <strong>Fecha de creacion : </strong>{location.fecha_creacion}
        </p>
        <p className="card-location-details__paragraph">
          <strong>canales conectados : </strong>{analogChannelsByLocationQty || 0} analogicos y {digitalChannelsByLocationQty || 0}  digitales
        </p>
        <p className="card-location-details__paragraph">
            <strong>Alarmas programadas : </strong>          
              <CardBtnSmall
                title={`Ver alarmas`}
                key={`ver_alarmas_ubicacion_${id}`}
                url={`${ENV.URL}/panel/alarmas/ubicaciones/${id}`}
              />          
          </p>
          <div className="card-locatin-details__btn-container">
          {/* text, icon, type, url, onClick */}
            <BtnCallToAction text="editar" icon='edit-regular.svg'/>
            <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
          </div>
      </div>
      
    </div>
  );
};

export default CardLocationDetails;

{/*<div className="location-card">
      <img src={location.ubicaciones_foto} alt={location.ubicaciones_nombre} className="location-image" />
      <div className="location-info">
        <h2>{location.ubicaciones_nombre}</h2>
        <div className="dataloggers">
          <span>Dataloggers conectados :</span>
          {dataloggersByLocation.map((datalogger) => (
            <CardBtnSmall title={datalogger.nombre} url={`/panel/dataloggers/${datalogger.id}`}/>              
          ))}
        </div>
        <p>{location.descripcion}</p>
        <p><strong>Fecha de creacion:</strong> {location.fecha_creacion}</p>
        <p><strong>Canales conectados:</strong> </p>
        {channelsByLocation.map((channel) => (
            <CardBtnSmall title={channel.canal_nombre} url={`/panel/canales/${channel.canal_id}`}/>              
          ))}
        <div className="alarms">
          <span>Alarmas programadas :</span>
          <button className="alarm-button"></button>
        </div>
        <div className="action-buttons">
          <button className="edit-button">EDITAR</button>
          <button className="delete-button">ELIMINAR</button>
        </div>
      </div>
    </div> */}