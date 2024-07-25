import React from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardDataloggerInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";




export const CardDataloggerInfo = (props) => {    
  const { title, name, id, location, channels, alarms } = props;
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  return (
    <div className="card-datalogger-info">
      <div className="card-datalogger-info__title">
        <img
          src={`${ENV.URL}/icons/${currentPageIcon.fileName}`}
          alt="icono de la categoria"
          className="card-datalogger-info__title__icon"
        />
        <span className="card-datalogger-info__title__text">{name}</span>
      </div>

      <div className="card-datalogger-info__description">
        <p className="card-datalogger-info__description__paragraph">
          <span>Instalado en :</span>
          <CardBtnSmall
            title={location.name}
            url={`${ENV.URL}/panel/ubicaciones/${location.id}`}
          />
        </p>
        <p className="card-datalogger-info__description__paragraph">
        <span>Canales conectados :</span>          
          {
          channels.map((channel) => (            
            <CardBtnSmall
              title={channel.name}
              url={`${ENV.URL}/panel/canales/${channel.id}`}
            />                          
          ))
          }
        </p>
        <p className="card-datalogger-info__description__paragraph">
        <span>Alarmas vigentes :</span>          
          {
          alarms.map((alarm) => (            
            <CardBtnSmall
              title={alarm.name}
              url={`${ENV.URL}/panel/alarmas/${alarm.id}`}
            />                          
          ))
          }
        </p>
      </div>

      <Link to={`${ENV.URL}/panel/dataloggers/${id}`} className="card-datalogger-info__btn">
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

export default CardDataloggerInfo;
