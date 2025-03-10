import React, {useEffect, useState} from "react";

import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
//import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext.jsx";
import { Title2 } from "../../components/Title2/Title2";
import EntityTable from "../../components/EntityTable/EntityTable.jsx";
import createApiClient from "../../api/apiClient";
import CardAlarmDetails from '../../components/CardAlarmDetails/CardAlarmDetails.jsx';


//import "./Dataloggers.css";

const ViewAlarm = () => {
  const { id : dataloggerId, alarmId, channelId } = useParams();
  const {user} = useAuth();
  const {alarms, dataloggers, channels, loadAlarms} = useDashboard();
  const [currentAlarm, setCurrentAlarm] = useState({});
  const [currentDatalogger, setCurrentDatalogger] = useState({});
  const [currentChannel, setCurrentChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentAlarmlogs, setCurrentAlarmlogs] = useState({});

  const apiClient = createApiClient();

  const columns = [
    { header: 'DIA Y HORA DEL EVENTO', key: 'fecha_disparo', iconName: 'clock-regular.svg' },
    { header: 'USUARIO', key: 'email', iconName: 'envelope-regular.svg' },
    { header: 'EVENTO', key: 'disparada', iconName: 'flag-regular.svg' },
    { header: 'VALOR', key: 'variables_valores', iconName: 'code-branch-solid.svg' },
    { header: 'VISTA', key: 'fecha_vista', iconName: 'eye-regular.svg' },
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

  const loadCurrentAlarm = async (alarmId) => {    
    const response = await apiClient.get(`/api/alarms/${alarmId}`);
    setCurrentAlarm(response.data.alarm);
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadAlarms(user.id);
      await loadCurrentAlarm(alarmId);
      await loadCurrentAlarmlogs(alarmId);
      setLoading(false);
    }
    loadData();
    //setCurrentAlarm(alarms.find(alarm => alarm.id == alarmId));
    setCurrentDatalogger(dataloggers.find(datalogger => datalogger.id == dataloggerId));
    setCurrentChannel(channels.find(channel => channel.canales_id == channelId));
    //await loadCurrentEntities(alarmId);
  }, [alarmId]);

  if (loading){
    return (<div>Cargando ...</div>)
  }
  
  return (
    <>
      <Title1     
        type="alarmas"   
        text={`Alarma "${currentAlarm.nombre}"`}
      />
      <Breadcumb />

       <CardAlarmDetails 
        alarm = {currentAlarm}      
        datalogger = {currentDatalogger}
        channel = {currentChannel}
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

