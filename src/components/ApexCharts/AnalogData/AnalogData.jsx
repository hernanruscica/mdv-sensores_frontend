import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const AnalogData = ( props ) => {
    const {data, mult} = props;
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [hoursBackView, setHoursBackView] = useState(24);

  const handlerClickBtnZoom = (e) => {
    const newHoursBackView = parseInt(e.target.dataset.hours);
    setHoursBackView(newHoursBackView);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(true);

      const processData =  (attribute) => {
        return  data.map(item => ({
          x: new Date(item.fecha).getTime(),
          y: parseFloat((item[attribute] * mult).toFixed(2) || 0)
        })).filter(item => !isNaN(item.y));
      };

      const instData = processData('inst');
      const minData = processData('min');
      const maxData = processData('max');

      //console.log(data, instData)

      const allValues = [...instData, ...minData, ...maxData].map(item => item.y);
      const overallMax = Math.max(...allValues);
      const overallMin = Math.min(...allValues);

      const maxDate = new Date(Math.max(...data.map(item => new Date(item.fecha).getTime())));
      const minDate = new Date(maxDate.getTime() - hoursBackView * 60 * 60 * 1000);

      setChartOptions({
        chart: {
          id: "multi-line",
          type: "line",
          animations: {
            enabled: false
          },
          zoom: {
            enabled: true
          }
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Fecha"
          },
          min: minDate.getTime(),
          max: maxDate.getTime()
        },
        yaxis: {
          title: {
            text: "Valores"
          },
          min: Math.floor(overallMin),
          max: Math.ceil(overallMax)
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy HH:mm"
          }
        },
        stroke: {
          width: [2, 2, 2],
          curve: 'smooth'
        },
        colors: ['#008FFB', '#00E396', '#FEB019'],
        legend: {
          show: true
        }
      });

      setChartSeries([
        { name: "Instantáneo", data: instData },
        { name: "Mínimo", data: minData },
        { name: "Máximo", data: maxData }
      ]);

      setLoading(false);
    }
  }, [data, hoursBackView]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={400}
      />
      <p>
        <strong>Ver últimas: </strong>
        {[1, 12, 24].map(hours => (
          <button 
            key={hours}
            onClick={handlerClickBtnZoom}
            data-hours={hours}
            className={`card-datalogger-info__graphic_container__btn ${hoursBackView === hours ? 'active' : ''}`}
          >
            {hours} {hours === 1 ? 'Hora' : 'Horas'}
          </button>
        ))}
      </p>
    </>
  );
};

export default AnalogData;