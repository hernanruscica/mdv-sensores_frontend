import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardChannelInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import createApiClient from '../../api/apiClient';
import DigitalPorcentageOn from "../ApexCharts/DigitalPorcentageOn/DigitalPorcentageOn";
import AnalogData from "../ApexCharts/AnalogData/AnalogData";
import {formatDate} from '../../utils/Dates/Dates';

export const CardChannelInfo = (props) => {   
  const apiClient = createApiClient(); 
  const { title, channel, datalogger, alarms } = props;
  const [loading, setLoading] = useState(true);
  const [dataChannel, setDataChannel] = useState([]); 
  const [channelType, setChannelType] = useState('digital');
  
  const hoursBackView = 120;
  const minutesBackView = hoursBackView * 60;

  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");    

    
    
    useEffect(() => {
      const loadDataFromChannel = async () => {
        setLoading(true);
        try {
          const currentChannelType = channel.nombre_columna.startsWith('d') ? 'digital' : 'analog';
          setChannelType(currentChannelType);
    
          let response;
          if (currentChannelType === 'digital') {
            response = await apiClient.get(`/api/data/getporcentages/${channel.nombre_tabla}/${channel.nombre_columna}/${minutesBackView}/${channel.tiempo_a_promediar}`);
          } else {
            response = await apiClient.get(`/api/data/getanalog/${channel.nombre_tabla}/${channel.nombre_columna}/${minutesBackView}`);
          }
    
          const data = response.data.data;
          setDataChannel(data);
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        } finally {
          setLoading(false);
        }
      };
    
      loadDataFromChannel();
    }, [datalogger.nombre_tabla, channel.nombre_columna]);
  
  if (!loading && channelType == 'analog'){
    //If this time is a analog channel  
  }

  // console.log(datalogger)
  
  return (
    <div className="card-datalogger-info">
      <div className="card-datalogger-info__title">
        <img
          src={`${ENV.URL}/icons/${currentPageIcon.fileName}`}
          alt="icono de la categoria"
          className="card-datalogger-info__title__icon"
        />
        <span className="card-datalogger-info__title__text">{channel.canal_nombre}</span>
      </div>      
      <div className="card-channel-info__description">
        <img src={`${ENV.IMAGES_URL}/${channel.foto}`} 
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
                url={`${ENV.URL}/panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/alarmas`}
              />                 
              :
              <strong>No tiene alarmas</strong>}
          </span>
          <span>          
            Total horas de uso: <strong>{Math.ceil(channel.horas_uso)}</strong> Hs.<br/> 
            Con datos desde <strong>{formatDate(channel.fecha_inicio, 'short')}</strong>                
          </span>
        </p>        
      </div>
      
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="card-datalogger-info__graphic_container">
          {dataChannel.length > 0 ? (
            channelType === 'digital' ? (
              <DigitalPorcentageOn 
                data={dataChannel}
                currentChannel={channel} />
            ) : (
              <AnalogData 
                data={dataChannel}
                mult={channel.multiplicador}
              />
            )
          ) : (
            <p>No hay datos disponibles para mostrar en el gráfico.</p>
          )}
        </div>
      )}
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