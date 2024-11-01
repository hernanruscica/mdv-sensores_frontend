import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./DigitalPorcentageOn.css";

const calculateAverage = (data, attributeName) => {
    if (data.length === 0) return 0; // Evitar división por cero
    const sum = data.map(item => item[attributeName]).reduce((sum, currentValue) => sum + currentValue, 0);
    return (sum / data.length).toFixed(2);
};

const DigitalPorcentageOn = (props) => {
    const { data, currentChannelName, currentChannelTimeProm } = props;
    const [loading, setLoading] = useState(true);
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);
    const [maxYValue, setMaxYValue] = useState(Math.max(...data.map(item => item.porcentaje_encendido)));
    const [minYValue, setMinYValue] = useState(Math.min(...data.map(item => item.porcentaje_encendido)));
    const [avgValue, setAvgValue] = useState(calculateAverage(data, 'porcentaje_encendido'));
    const [hoursBackView, setHoursBackView] = useState(24); // Default a 24 horas

    const handlerClickBtnZoom = (e) => {        
        const newhoursBackView = parseInt(e.target.dataset.hours);        
        setHoursBackView(newhoursBackView);
    };    
    
    useEffect(() => {        
        if (data && data.length > 0) {
            setLoading(true);
            const seriesData = data.map(item => ({
                x: new Date(item.fecha).getTime(), // Convertir a timestamp
                y: parseFloat(item.porcentaje_encendido) // Asegurar que sea un número
            })).filter(item => !isNaN(item.y)); // Filtrar valores no numéricos
            
            const maxDate = new Date(seriesData[seriesData.length - 1].x);
            const minDate = new Date(maxDate.getTime() - hoursBackView * 60 * 60 * 1000);    

            const seriesDataPeriod = seriesData.filter(data => data.x > minDate && data.x < maxDate);

            const maxY = Math.max(...seriesDataPeriod.map(item => item.y));
            const minY = Math.min(...seriesDataPeriod.map(item => item.y));
            const avg = calculateAverage(seriesDataPeriod, 'y');

            setMaxYValue(maxY);
            setMinYValue(minY);
            setAvgValue(avg);

            const failsRegisters = data.filter(element => element.tiempo_total >= 900);
            // console.log(failsRegisters[0].fecha);
            // console.log(new Date(failsRegisters[0].fecha).getTime())

            const failsRegisterArray = failsRegisters.map((register) => {
                return {
                            x: new Date(register.fecha).getTime(), // Línea de fecha de corte
                            borderColor: '#FF4560',
                            label: {
                                borderColor: '#FF4560',
                                style: { color: '#fff', background: '#FF4560' },
                                text: 'Fallo datos',
                            }
                        }
                
            })

            // Mantener las opciones originales pero añadir la línea de promedio
            setChartOptions({
                chart: {
                    id: "basic-line",
                    type: "line",
                    pan: { enabled: true }
                },
                xaxis: {
                    type: "datetime",
                    title: { text: "Fecha" },                
                    min: minDate.getTime(),
                    max: maxDate.getTime(),
                },
                yaxis: {
                    title: { text: "Porcentaje de Encendido" },
                    min: 0,
                    max: 100
                },
                tooltip: {
                    x: { format: "dd MMM yyyy HH:mm" }
                },
                stroke: {
                    show: true,
                    curve: 'straight',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 1, 
                    dashArray: 0, 
                },
                annotations: {
                    yaxis: [
                        {
                            y: maxY, // Línea de máximo
                            borderColor: '#FF4560',
                            label: {
                                borderColor: '#FF4560',
                                style: { color: '#fff', background: '#FF4560' },
                                text: 'MAX',
                            }
                        },
                        {
                            y: minY, // Línea de mínimo
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                style: { color: '#fff', background: '#00E396' },
                                text: 'MIN',
                            }
                        },
                        {
                            y: avg, // Línea de promedio
                            borderColor: '#008FFB',
                            label: {
                                borderColor: '#008FFB',
                                style: { color: '#fff', background: '#008FFB' },
                                text: 'AVG',
                            }
                        }
                    ],
                    xaxis: failsRegisterArray ? failsRegisterArray : []
                }
            });

            setChartSeries([{
                name: "Porcentaje de Encendido",
                data: seriesDataPeriod
            }]);

            setLoading(false);
        }
    }, [data, hoursBackView]);

    if (loading) {
        return <div>cargando...</div>;
    }

   
   //console.log(data[0]);

    return (
        <>
            <p className="card-datalogger-info__graphic_container__paragraph">
            {`Grafico del canal "${currentChannelName}". Cada punto del grafico integra los valores de las lecturas de los ultimos ${currentChannelTimeProm} minutos.`}
            </p>
            <Chart 
                className="apexcharts-canvas"
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={300}
            />            
            <p className="card-datalogger-info__graphic_container__paragraph">
                <strong>Ver últimas: </strong> 
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="1"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 1 ? 'active' : ''}`}>
                    1 Hora
                </button>
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="12"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 12 ? 'active' : ''}`}>
                    12 Horas
                </button>
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="24"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 24 ? 'active' : ''}`}>
                    24 Horas
                </button>
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="48"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 48 ? 'active' : ''}`}>
                    2 Días
                </button>
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="72"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 72 ? 'active' : ''}`}>
                    3 Días
                </button>
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="96"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 96 ? 'active' : ''}`}>
                    4 Días
                </button>
                <button 
                    onClick={handlerClickBtnZoom}
                    data-hours="120"
                    className={`card-datalogger-info__graphic_container__btn ${hoursBackView === 120 ? 'active' : ''}`}>
                    5 Días
                </button>    
            </p>
            <p className="card-datalogger-info__graphic_container__paragraph">
                <span><strong>Máximo: </strong> {`${maxYValue}%`}</span>
                <span><strong>Promedio: </strong> {`${avgValue}%`}</span>
                <span><strong>Mínimo: </strong> {`${minYValue}%`}</span>
                <span>{` de las ultimas ${hoursBackView} horas`}</span>
            </p>
        </>
    );
};

export default DigitalPorcentageOn;
