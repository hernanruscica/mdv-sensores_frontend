import React, {useState} from 'react';
import './CardAlarmDetails.css';
//import { useDashboard } from '../../context/DashboardContext';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall.jsx';
import { ENV } from "../../context/env.js";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction.jsx';
import { formatDate } from "../../utils/Dates/Dates.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CardAlarmDetails = (props) => {

  const { datalogger, channel, alarm } = props;    
      const {user} = useAuth(); 
  console.log(channel);



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
            title={channel.canales_nombre}
            key={`ver_canal_${channel.id}`}
            url={`${ENV.URL}/panel/dataloggers/${datalogger.id}/canales/${channel.canales_id}`}
          />           
        </p>
        <p className="card-alarm-details__paragraph">
        ⏰ {alarm.descripcion}
        </p>
        <p className="card-alarm-details__paragraph">
        📝 <strong>Condicion: </strong>{alarm.condicion}
        </p>
        <p className="card-alarm-details__paragraph">
        📅 <strong>Creada el: </strong>{formatDate(alarm.fecha_creacion, 'short')}
        </p>
                          
        
          <div className="card-alarm-details__btn-container">
          {/* text, icon, type, url, onClick */}
            {(user.espropietario == 1)?
            <>
              <BtnCallToAction text="editar" icon='edit-regular.svg' 
                url={`panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/alarmas/${alarm.id}/edicion`}/>
              <BtnCallToAction text="eliminar" icon='trash-alt-regular.svg' 
                url={`panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/alarmas/${alarm.id}/eliminacion`}
                type="danger"/>
            </>
            :''}
          </div>
      </div>
      
    </div>
  );
};

export default CardAlarmDetails;

