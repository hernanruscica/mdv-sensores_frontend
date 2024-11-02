import React from "react";

import "./CardAlarmInfo.css";

import Gauge from "../Gauge/Gauge.jsx";
import { formatDate } from "../../utils/Dates/Dates.js";
import CardTitle from "../CardsCommon/CardTitle/CardTitle.jsx";
import CardLinkButton from "../CardsCommon/CardLinkButton/CardLinkButton.jsx";


export const CardAlarmInfo = (props) => {    
  const { name, id, alarm, channel, lastReadData, iconSrc } = props;    
    
  const conditionOperator = alarm.condicion.split(" ")[1];
  const conditionValue = alarm.condicion.split(" ")[2];  
  const max = (conditionOperator.includes(">")) ? conditionValue : 100;
  const min = (conditionOperator.includes("<")) ? conditionValue : 0;

  return (
    <div className="card-datalogger-info">      
      <CardTitle 
        text={name}
        iconSrc={iconSrc}
      />
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
      <CardLinkButton 
        url={`/panel/dataloggers/${channel.datalogger_id}/canales/${channel.id}/alarmas/${id}`}
      />
    </div>
  );
};

export default CardAlarmInfo;
