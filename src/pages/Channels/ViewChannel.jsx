import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import CardChannelDetails from '../../components/CardChannelDetails/CardChannelDetails';
import createApiClient from '../../api/apiClient';
import DigitalPorcentageOn from "../../components/ApexCharts/DigitalPorcentageOn/DigitalPorcentageOn";

//import "./Dataloggers.css";

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


  useEffect(() => {
    const loadData = async () =>{
      setLoading(true);
      await loadChannels(user.id);
      await loadAlarms(user.id);
      setCurrentChannel(channels.find(channel => channel.canal_id == channelId));
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
        const response = await apiClient.get(`/api/data/getporcentages/${currentDatalogger.nombre_tabla}/${currentChannel.nombre_columna}/2880/${currentChannel.tiempo_a_promediar}`);
        const data = response.data.data;             
        setDataChannel(data);                
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading2(false);
      }
    }
    if (!loading) {loadData();}
  }, [currentChannel]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  //console.log(currentChannel, currentDatalogger, currentAlarms);
  return (
    <>
      <Title1     
        type="canales"   
        text={`Canal "${currentChannel.canal_nombre}" del datalogger "${currentDatalogger.nombre}"`}
      />
      <Breadcumb />
      {/* <UnderConstruction></UnderConstruction> */}
      <CardChannelDetails 
        channel={currentChannel}
        datalogger={currentDatalogger}
        alarms={currentAlarms}
      />
      {
        (loading2) 
        ? <div>Cargando...</div>
        : <DigitalPorcentageOn 
            data={dataChannel}
          />
        
      }
    </>
  );
};

export default ViewChannel;
