import React from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardLocationInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";




export const CardLocationInfo = (props) => {    
  const { type, locationData, userData, dataloggers } = props;
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === type) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  return (
    <div className="card-location-info">
      <div className="card-location-info__title">
        <img
          src={`${ENV.URL}/icons/${currentPageIcon.fileName}`}
          alt="icono de la categoria"
          className="card-location-info__title__icon"
        />
        <span className="card-location-info__title__text">{locationData.name}</span>
      </div>
      <div className="card-location-info__description">
        <p className="card-location-info__description__paragraph">
          {locationData.description}
        </p>
      </div>
      <div className="card-location-info__description">
        <p className="card-location-info__description__paragraph">
          <span>Su rol : {userData.rol}</span>
          <CardBtnSmall
            title='Cambiar rol'
            url={`${ENV.URL}/panel/usuarios/${userData.id}`}
          />
        </p>
        <p className="card-location-info__description__paragraph">
        <span>Dataloggers conectados :</span>          
          {
          dataloggers.map((datalogger) => (            
            <CardBtnSmall
              key={`datalogger_${datalogger.id}`}
              title={datalogger.name}
              url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
            />                          
          ))
          }
        </p>        
      </div>

      <Link to={`${ENV.URL}/panel/locations/${locationData.id}`} className="card-location-info__btn">
        <img
          src={`${ENV.URL}/icons/eye-regular-white.svg`}
          alt="icono de la ver categoria"
          className="card-location-info__btn__img"
        />
        <span className="card-location-info__btn__text">Ver todo</span>
      </Link>
    </div>
  );
};

export default CardLocationInfo;
