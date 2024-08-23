import React from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardChannelInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";

export const CardChannelInfo = (props) => {    
  const { title, channel, alarms } = props;
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");
console.log(channel)
  return (
    <div className="card-datalogger-info" >
      <div className="card-datalogger-info__title">
        <img
          src={`${ENV.URL}/icons/${currentPageIcon.fileName}`}
          alt="icono de la categoria"
          className="card-datalogger-info__title__icon"
        />
        <span className="card-datalogger-info__title__text">{channel.canal_nombre}</span>
      </div>      
      <div className="card-channel-info__description">
        <img src={`https://mdv-sensores-rltk.onrender.com/images/${channel.foto}`} 
              className='card-datalogger-info__container__image'
              alt={`Foto de ${channel.canal_nombre}`}
              title={`Foto de ${channel.canal_nombre}`} 
        />
        <p className="card-datalogger-info__description__paragraph">
          {channel.canal_descripcion}
          <span>Alarmas programadas : <br/>                       
          {(alarms?.length > 0) ?
            <CardBtnSmall
              key={`alarm-${channel.canal_id}`}
              title={`Ver ${alarms.length} alarmas`}
              url={`${ENV.URL}/panel/alarmas/canales/${channel.canal_id}`}
            />                 
            :
            <strong>No tiene alarmas</strong>}
          </span>
        </p>
        
        
      </div>
      <Link to={`${ENV.URL}/panel/dataloggers/${channel.datalogger_id}/canales/${channel.canal_id}`} className="card-datalogger-info__btn">
        <img
          src={`${ENV.URL}/icons/eye-regular-white.svg`}
          alt="icono de la ver categoria"
          className="card-datalogger-info__btn__img"
        />
        <span className="card-datalogger-info__btn__text">Ver todo</span>
      </Link>
    </div>
  );
};

export default CardChannelInfo;