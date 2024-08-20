import React from 'react';
import './CardLocationDetails.css';
import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';

const CardLocationDetails = (props) => {
    const {locations, dataloggers, channels} = useDashboard();
    const { id } = props;    
    const location = locations.find(location => location.ubicaciones_id == id);
    const dataloggersByLocation = dataloggers.filter(datalogger => datalogger.ubicacion_id == id);         
    const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id)
    console.log(channelsByLocation)   
    //console.log(location)
  return (
    <div className="location-card">
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
    </div>
  );
};

export default CardLocationDetails;