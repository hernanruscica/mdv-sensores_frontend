import React, { useEffect, useState } from "react";

//import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardChannelInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import createApiClient from '../../api/apiClient';
import DigitalPorcentageOn from "../ApexCharts/DigitalPorcentageOn/DigitalPorcentageOn";
import AnalogData from "../ApexCharts/AnalogData/AnalogData";
import {formatDate} from '../../utils/Dates/Dates';
import CardTitle from "../CardsCommon/CardTitle/CardTitle";
import CardLinkButton from "../CardsCommon/CardLinkButton/CardLinkButton";

export const CardChannelInfo = (props) => {   
  const apiClient = createApiClient(); 
  const { channel, datalogger, alarms, iconSrc } = props;
  const [loading, setLoading] = useState(true);
  const [dataChannel, setDataChannel] = useState([]); 
  const [channelType, setChannelType] = useState('digital');
  
  const hoursBackView = 120;
  const minutesBackView = hoursBackView * 60;    
    
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
  
  return (
    <div className="card-channel-info">      
      <CardTitle 
        text={channel.canal_nombre}
        iconSrc={iconSrc}
      />
      <div className="card-channels-info__description">
        <div className='card-channels-info__container'>
          <img src={`${ENV.IMAGES_URL}/${channel.foto}`}           
            alt={`Foto de ${channel.canal_nombre}`}
            title={`Foto de ${channel.canal_nombre}`} 
            className='card-channels-info__container__image'
          />
        </div>
        <p className="card-channel-info__description__paragraph">
          {channel.canal_descripcion}
          <span>Alarmas programadas : <br/>                       
            {(alarms?.length > 0) ?
              <CardBtnSmall
                key={`alarm-${channel.canal_id}`}
                title={`Ver ${alarms.length} alarmas`}
                url={`/panel/dataloggers/${datalogger.id}/canales/${channel.canal_id}/alarmas`}
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
        <div className="card-channel-info__graphic_container">
          {dataChannel.length > 0 ? (
            channelType === 'digital' ? (
              <DigitalPorcentageOn 
                data={dataChannel}
                currentChannelName = {channel.canal_nombre}
                currentChannelTimeProm = {channel.tiempo_a_promediar}
                />
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
      <CardLinkButton 
        url={`/panel/dataloggers/${channel.datalogger_id}/canales/${channel.canal_id}`}
      />
    </div>
  );
};

export default CardChannelInfo;