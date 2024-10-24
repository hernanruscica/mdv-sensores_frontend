import React, {useEffect, useState} from "react";

import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
//import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import { useDashboard } from "../../context/DashboardContext";
import { Title2 } from "../../components/Title2/Title2";
import EntityTable from "../../components/EntityTable/EntityTable.jsx";
import createApiClient from "../../api/apiClient";
import CardAlarmDetails from '../../components/CardAlarmDetails/CardAlarmDetails.jsx';

//import "./Dataloggers.css";

const ViewAlarm = () => {
  const { alarmId } = useParams();
  
  const {alarms, dataloggers, channels} = useDashboard();
  const [currentAlarm, setCurrentAlarm] = useState({});
  const [currentDatalogger, setCurrentDatalogger] = useState({});
  const [currentChannel, setCurrentChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentAlarmlogs, setCurrentAlarmlogs] = useState({});

  const apiClient = createApiClient();

  const columns = [
    { header: 'DIA Y HORA DEL EVENTO', key: 'fecha_disparo' },
    { header: 'USUARIO', key: 'email' },
    { header: 'EVENTO', key: 'disparada' },
    { header: 'VALOR', key: 'variables_valores' },
    { header: 'VISTA', key: 'fecha_vista' },
  ];

  const loadCurrentAlarmlogs = async (alarmId) => {
    try {
      ///api/alarmlogs/byalarm/67 
      const response = await apiClient.get(`/api/alarmlogs/byalarm/${alarmId}`);
      setCurrentAlarmlogs(response.data.alarmLogs);
    } catch (error) {
      console.error("Error loading datalogger info:", error);
    }
  }

  const loadCurrentEntities = async (alarmId) => {
    
    setCurrentDatalogger(dataloggers.find(datalogger => datalogger.id == currentAlarm.datalogger_id));
    setCurrentChannel(channels.find(channel => channel.canal_id == currentAlarm.canal_id));
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      //await loadAlarms(user.id);
      setCurrentAlarm(alarms.find(alarm => alarm.id == alarmId));
      setCurrentDatalogger(dataloggers.find(datalogger => datalogger.id == currentAlarm.datalogger_id));
      setCurrentChannel(channels.find(channel => channel.canal_id == currentAlarm.canal_id));
      //await loadCurrentEntities(alarmId);

      await loadCurrentAlarmlogs(alarmId);
      setLoading(false);
    }
    loadData();
  }, [alarmId]);

  if (loading){
    return (<div>Cargando ...</div>)
  }

  //console.log(currentChannel);
  
  return (
    <>
      <Title1     
        type="alarmas"   
        text={`Alarma "${currentAlarm.nombre}"`}
      />
      <Breadcumb />

       <CardAlarmDetails 
        alarm = {currentAlarm}      
        datalogger = {dataloggers.find(datalogger => datalogger.id == currentAlarm.datalogger_id)}
        channel = {channels.find(channel => channel.canal_id == currentAlarm.canal_id)}
      />  
      
      <Title2     
        type="historial"   
        text={`Historial de disparos y reseteos`}
      />
       <EntityTable 
        data={currentAlarmlogs} 
        columns={columns}         
        entityType="alarmas_logs"
      /> 
    </>
  );
};

export default ViewAlarm;

