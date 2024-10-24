import React from 'react';
import './CardChannelDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";

const CardChannelDetails = (props) => {
    
    const { datalogger, channel, alarms } = props;    
      
    //console.log(channel)   


  return (    
    <div className="card-location-details">
      <div className="location-details__container">
        <img src={`${ENV.IMAGES_URL}/${channel.foto}`} 
          className='location-details__container__image'
          alt={`Foto de ${channel.canal_nombre}`}
          title={`Foto de ${channel.canal_nombre}`} 
        />
      </div>
      <div className="location-details__info">
        <h2 className="card-location-details__info__title">        
          {channel.canal_nombre}
        </h2>
        <p className="card-location-details__paragraph">
          <strong>Pertenece a: </strong>
          <CardBtnSmall
            title={datalogger.nombre}
            key={`ver_datalogger_${datalogger.id}`}
            url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
          />          
        </p>
        <p className="card-location-details__paragraph">
          {channel.canal_descripcion}
        </p>
        <p className="card-location-details__paragraph">
          {/* <strong>Creado el {formatDate(channel.fecha_creacion, 'short')}</strong><br/> */}
          <span>          
            Total horas de uso: <strong>{Math.ceil(channel.horas_uso)}</strong> Hs.<br/> 
            Con datos desde <strong>{formatDate(channel.fecha_inicio, 'short')}</strong>                
          </span>
        </p>                      
        <p className="card-location-details__paragraph">
            <strong>Alarmas programadas : </strong>          
             {
             (alarms.length > 0) ?
             (<CardBtnSmall
               title={`Ver ${alarms.length} alarmas`}
               key={`ver_alarmas_canal_${channel.id}`}               
               url={`${ENV.URL}/panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/alarmas`}
             />  ) :
             ("no hay alarmas")       
             }
          </p>
          <div className="card-locatin-details__btn-container">
          {/* text, icon, type, url, onClick */}
            <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/edicion`}/>
            <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
          </div>
      </div>
      
    </div>
  );
};

export default CardChannelDetails;

