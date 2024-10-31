import React from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardAlarmInfo.css";

import Gauge from "../Gauge/Gauge.jsx";
import { formatDate } from "../../utils/Dates/Dates.js";


export const CardAlarmInfo = (props) => {    
  const { title, name, id, alarm, channel, lastReadData } = props;
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");
    
    
  const conditionOperator = alarm.condicion.split(" ")[1];
  const conditionValue = alarm.condicion.split(" ")[2];
  //console.log(conditionOperator, conditionValue)
  const max = (conditionOperator.includes(">")) ? conditionValue : 100;
  const min = (conditionOperator.includes("<")) ? conditionValue : 0;

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


          {/* Grafico de relojito  {lastReadData[alarm.nombre_variables]}  
          lo carga si la alarma es de porcentaje de encendido o si corresponde */}
          {(alarm.tipo_alarma == "PORCENTAJE_ENCENDIDO")
          ? (<Gauge currentValue={lastReadData[alarm.nombre_variables]} 
              alarmMax={max} 
              alarmMin={min}
            />)
          : <strong>Mostrar algo ilustrativo</strong>
          }

        </div>        
      </div>
      <Link to={`${ENV.URL}/panel/dataloggers/${channel.datalogger_id}/canales/${channel.id}/alarmas/${id}`} className="card-datalogger-info__btn">
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
