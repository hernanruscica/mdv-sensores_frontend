import React from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardAlarmInfo.css";

import Gauge from "../Gauge/Gauge.jsx";
import { formatDate } from "../../utils/Dates/Dates.js";
import { parseCondition, parseMultipleConditions } from '../../utils/AlarmConditions/AlarmConditions.js'

export const CardAlarmInfo = (props) => {    
  const { title, name, id, alarm, channel, lastReadData, minRead, maxRead } = props;
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");


    //console.log(parseMultipleConditions("(d1_porc_encendido > 0) and (d1_porc_encendido < 80)")); works
    const boundsValues = parseMultipleConditions(alarm.condicion);
    //console.log(channel);
    //console.log(lastReadData, alarm);

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
          Creada el {formatDate(alarm.fecha_creacion)}
        </p>
        <p className="card-datalogger-info__description__paragraph">
          {alarm.descripcion}
        </p>
        <p className="card-datalogger-info__description__paragraph">
          Condicion: {alarm.condicion}              
        </p>
        <div className="card-datalogger-info__description__paragraph">
          {/* Grafico de relojito  {lastReadData[alarm.nombre_variables]}  */}
          <Gauge currentValue={lastReadData[alarm.nombre_variables]} 
            alarmMax={boundsValues.porcentaje_encendido.max} 
            alarmMin={boundsValues.porcentaje_encendido.min}/>
        </div>        
      </div>
      <Link to={`${ENV.URL}/panel/dataloggers/${channel.datalogger_id}/canales/${channel.canal_id}/alarmas/${id}`} className="card-datalogger-info__btn">
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

export default CardAlarmInfo;