import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardChannelInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import createApiClient from '../../api/apiClient';

export const CardChannelInfo = (props) => {   
  const apiClient = createApiClient(); 
  const { title, channel, datalogger, alarms } = props;
  const [loading, setLoading] = useState(true);
  const [dataChannel, setDataChannel] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [maxYValue, setMaxYValue] = useState(100);
  const [minYValue, setMinYValue] = useState(0);
  
  
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");    
    
  useEffect(() => {    
    const loadDataFromChannel = async () => {      
      setLoading(true);
      try {
        const response = await apiClient.get(`/api/data/getporcentages/${datalogger.nombre_tabla}/${channel.nombre_columna}/2880/${channel.tiempo_a_promediar}`);
        const data = response.data.data;      
        //console.log("Datos recibidos de la API:", data); // Agregar este log
        setDataChannel(data);
        
        // Verificar si los datos son válidos antes de procesarlos
        if (data && data.length > 0) {
          const seriesData = data.map(item => ({
            x: new Date(item.fecha).getTime(), // Convertir a timestamp
            y: parseFloat(item.porcentaje_encendido) // Asegurar que sea un número
          })).filter(item => !isNaN(item.y)); // Filtrar valores no numéricos
          
          const maxDate = new Date(seriesData[seriesData.length - 1].x);
          const minDate = new Date(maxDate.getTime() - 1 * 24 * 60 * 60 * 1000);            

          
          setMaxYValue(Math.max(...seriesData.map(item => item.y)));
          setMinYValue(Math.min(...seriesData.map(item => item.y)));

          console.log(`Valor minimo en el canal ${channel.canal_nombre}:`, minYValue);


          setChartOptions({
            chart: {
              id: "basic-line",
              type: "line",
              zoom: {
                enabled: true, // Permitir que el usuario haga zoom
              }
            },
            xaxis: {
              type: "datetime",
              title: {
                text: "Fecha"
              },
              min: minDate.getTime(),
              max: maxDate.getTime(),
            },
            yaxis: {
              title: {
                text: "Porcentaje de Encendido"
              },
              min: 0,
              max: 100
            },
            tooltip: {
              x: {
                format: "dd MMM yyyy HH:mm"
              }
            },
            stroke: {
              show: true,
              curve: 'straight',
              lineCap: 'butt',
              colors: undefined,
              width: 2, 
              dashArray: 0, 
            },
            annotations: {
              yaxis: [
                {
                  y: maxYValue,
                  borderColor: '#FF4560',
                  label: {
                    borderColor: '#FF4560',
                    style: {
                      color: '#fff',
                      background: '#FF4560',
                    },
                    text: 'MAX',
                  }
                },
                {
                  y: minYValue,
                  borderColor: '#00E396',
                  label: {
                    borderColor: '#00E396',
                    style: {
                      color: '#fff',
                      background: '#00E396',
                    },
                    text: 'MIN',
                  }
                }
              ]
            }
          });

          setChartSeries([
            {
              name: "Porcentaje de Encendido",
              data: seriesData
            }
          ]);
        } else {
          console.log("No se recibieron datos válidos de la API");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    }; 

    loadDataFromChannel();
  }, [datalogger.nombre_tabla, channel.nombre_columna, channel.tiempo_a_promediar]);
  

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
      {(loading)
      ? (<div>Cargando...</div>)
      : (<div className="card-datalogger-info__graphic_container" >        
          {dataChannel.length > 0 ? (
            <>
              <Chart 
                className="apexcharts-canvas"
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={300}
              />
              <p className="card-datalogger-info__graphic_container__paragraph">
                <span><strong>Máximo: </strong> {` ${maxYValue}%`}</span>
                <span><strong>Mínimo: </strong> {` ${minYValue}%`}</span>
              </p>
              <p className="card-datalogger-info__graphic_container__paragraph">
                <strong>Ver últimas: </strong> 
                <button 
                  className="card-datalogger-info__graphic_container__btn">
                  1 Hora
                </button>
                <button 
                  className="card-datalogger-info__graphic_container__btn">
                  12 Horas
                </button>
                <button 
                  className="card-datalogger-info__graphic_container__btn">
                  24 Horas
                </button>
               
              </p>
            </>
          ) : (
            <p>No hay datos disponibles para mostrar en el gráfico.</p>
          )}
        </div>)
      } 
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
