import React, {useState} from 'react';
import './CardAlarmDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall.jsx';
import { ENV } from "../../context/env.js";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction.jsx';
import { formatDate } from "../../utils/Dates/Dates.js";

const CardAlarmDetails = (props) => {

  const { datalogger, channel, alarm } = props;    
      
  //console.log(alarm);



  return (    
    <div className="card-alarm-details">      
        <h2 className="card-alarm-details__info__title">        
          {alarm.nombre}
        </h2>
      <div className="alarm-details__info">
        <p className="card-alarm-details__paragraph">
          <strong>Pertenece al datalogger: </strong>
            <CardBtnSmall
            title={datalogger.nombre}
            key={`ver_datalogger_${datalogger.id}`}
            url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
          /> <br/>
          <strong> y al canal: </strong>
            <CardBtnSmall
            title={channel.canal_nombre}
            key={`ver_canal_${channel.id}`}
            url={`${ENV.URL}/panel/dataloggers/${datalogger.id}/canales/${channel.id}`}
          />           
        </p>
        <p className="card-alarm-details__paragraph">
          {alarm.descripcion}
        </p>
        <p className="card-alarm-details__paragraph">
          <strong>Condicion: </strong>{alarm.condicion}
        </p>
        <p className="card-alarm-details__paragraph">
          <strong>Creada el: </strong>{formatDate(alarm.fecha_creacion, 'short')}
        </p>
                          
        
          <div className="card-alarm-details__btn-container">
          {/* text, icon, type, url, onClick */}
            <BtnCallToAction text="editar" icon='edit-regular.svg' url={`panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/alarmas/${alarm.id}/edicion`}/>
            <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' type="danger"/>
          </div>
      </div>
      
    </div>
  );
};

export default CardAlarmDetails;

