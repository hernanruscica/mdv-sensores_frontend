import React from 'react';
import './CardChannelDetails.css';
import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CardChannelDetails = (props) => {
    
    const { datalogger, channel, alarms } = props;    
    const { channels } = useDashboard();
      
    const horas_uso = Math.ceil(channels.find(ch=> ch.canal_id == channel.id).horas_uso);
    const desde = formatDate(channels.find(ch=> ch.canal_id == channel.id).fecha_inicio, 'short')
    const {user} = useAuth();


  return (    
    <div className="card-channel-details">
      <div className="channel-details__container">
        <img src={`${ENV.IMAGES_URL}/${channel.foto}`} 
          className='channel-details__container__image'
          alt={`Foto del canal ${channel.nombre}`}
          title={`Canal ${channel.nombre}`} 
        />
      </div>
      <div className="channel-details__info">
        <h2 className="channel-details__info__title">        
          {channel.nombre}
        </h2>
        <p className="channel-details__paragraph">
          <strong>Pertenece al datalogger : </strong>
          <CardBtnSmall
            title={datalogger.nombre}
            key={`ver_datalogger_${datalogger.id}`}
            url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
          />          
        </p>
        <p className="channel-details__paragraph">
        📝 {channel.descripcion}
        </p>
        <p className="channel-details__paragraph">
          {/* <strong>Creado el {formatDate(channel.fecha_creacion, 'short')}</strong><br/> */}
          <span>          
          🕙Total horas de uso: <strong>{horas_uso}</strong> Hs. Con datos desde <strong>{desde}</strong>                
          </span>
        </p>                      
        <p className="channel-details__paragraph">
          ⏰<strong>Alarmas programadas : </strong>          
             {
             (alarms.length > 0) ?
             (<CardBtnSmall
               title={`Ver ${alarms.length} alarmas`}
               key={`ver_alarmas_canal_${channel.id}`}               
               url={`${ENV.URL}/panel/dataloggers/${datalogger.id}/canales/${channel.id}/alarmas`}
             />  ) :
             ("no hay alarmas")       
             }
          </p>
          <div className="channel-details__btn-container">
          {/* text, icon, type, url, onClick */}
            <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/dataloggers/${datalogger.id}/canales/${channel.id}/edicion`}/>
            {(user.espropietario == 1)?
            <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' url={`panel/dataloggers/${datalogger.id}/canales/${channel.id}/eliminacion`}type="danger"/>
            : ''}
            
          </div>
      </div>
      
    </div>
  );
};

export default CardChannelDetails;

