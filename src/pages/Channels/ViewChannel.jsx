import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import CardChannelDetails from '../../components/CardChannelDetails/CardChannelDetails';
import createApiClient from '../../api/apiClient';
//import DigitalPorcentageOn from "../../components/ApexCharts/DigitalPorcentageOn/DigitalPorcentageOn";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import CardAlarmInfo from "../../components/CardAlarmInfo/CardAlarmInfo.jsx";
import CardChannelGraphic from "../../components/CardChannelGraphic/CardChannelGraphic.jsx";


//import "./viewchannel.css";

const ViewChannel = () => {
  const apiClient = createApiClient(); 
  const { user } = useAuth();
  const { dataloggers, channels, alarms, loadChannels, loadAlarms } = useDashboard();
  const { id, channelId} = useParams();
  const [ loading, setLoading] = useState(true);
  const [ loading2, setLoading2] = useState(true);
  const [ currentChannel, setCurrentChannel] = useState([]);
  const [ currentDatalogger, setCurrentDatalogger] = useState([]);
  const [ currentAlarms, setCurrentAlarms] = useState([]);
  const [ dataChannel, setDataChannel] = useState([]);

  const hoursBackView = 120;

  useEffect(() => {
    const loadData = async () =>{
      setLoading(true);
       await loadChannels(user.id);
       await loadAlarms(user.id);
      const response = await apiClient.get(`/api/channels/${channelId}`);      
      
      setCurrentChannel(response.data.channel);
      setCurrentDatalogger(dataloggers.find(datalogger => datalogger.id == id));
      setCurrentAlarms(alarms.filter(alarm => alarm.canal_id == channelId));
      setLoading(false);
    };
    loadData();
  }, [user.id, id]);

  useEffect(() => {
    const loadData = async () => {
      setLoading2(true);
      try {
        const response = await apiClient.get(`/api/data/getporcentages/${currentDatalogger.nombre_tabla}/${currentChannel.nombre_columna}/${hoursBackView*60}/${currentChannel.tiempo_a_promediar}`);
        const data = response.data.data;             
        setDataChannel(data);     
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading2(false);
      }
    }
    if (!loading) {loadData();}
  }, [currentChannel, currentDatalogger]);


  if (loading) {
    return <div>Cargando...</div>;
  }
  
   
  return (
    <>
      <Title1     
        type="canales"   
        text={`Canal "${currentChannel.nombre}" del datalogger "${currentDatalogger.nombre}"`}
      />
      <Breadcumb />
      
      <CardChannelDetails 
        channel={currentChannel}
        datalogger={currentDatalogger}
        alarms={currentAlarms}
      />
      {
        (loading2) 
        ? <div>Cargando...</div>
        : 
         <CardChannelGraphic 
            dataChannel= {dataChannel}
            currentChannel = {currentChannel}
         />      
      }      
        <Title2
          type="alarmas"
          text={`Alarmas activas para "${currentChannel?.canal_nombre || ''}"`}
        />
        <ButtonsBar
          itemsName="alarmas"
          itemsQty={currentAlarms.length}
        />        
      {
        (currentAlarms.length > 0 && !loading2)
      ? currentAlarms.map((alarm) => (
        <CardAlarmInfo 
          key={alarm.nombre + alarm.id}
          title='alarmas'
          name={alarm.nombre}
          id={alarm.id}
          alarm={alarm}
          channel={currentChannel}
          lastReadData={dataChannel[dataChannel.length-1]}          
        />
      ))
      :
        <div>No hay alarmas vigentes para este</div>
      }
     
    </>
  );
};

export default ViewChannel;
