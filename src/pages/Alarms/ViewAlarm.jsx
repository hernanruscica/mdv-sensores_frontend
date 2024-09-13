import React, {useEffect, useState} from "react";
import { useAuth } from '../../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
//import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import { useDashboard } from "../../context/DashboardContext";
import { Title2 } from "../../components/Title2/Title2";
import EntityTable from "../../components/EntityTable/EntityTable.jsx";
import createApiClient from "../../api/apiClient";

//import "./Dataloggers.css";

const ViewAlarm = () => {
  const { alarmId } = useParams();
  const { user } = useAuth();
  const {alarms, loadAlarms} = useDashboard();
  const [currentAlarm, setCurrentAlarm] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentAlarmlogs, setCurrentAlarmlogs] = useState({});

  const apiClient = createApiClient();

  const columns = [
    { header: 'FECHA Y HORA', key: 'nombre' },
    { header: 'USUARIO', key: 'max' },
    { header: 'EVENTO', key: 'max' },
    { header: 'VALOR', key: 'canal_nombre' },
    { header: 'VISTA', key: 'max' },
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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadAlarms(user.id);
      setCurrentAlarm(alarms.find(alarm => alarm.id == alarmId));
      loadCurrentAlarmlogs(alarmId);
      setLoading(false);
    }
    loadData();
  }, [user.id, alarmId]);

  if (loading){
    return (<div>Cargando ...</div>)
  }
  console.log(currentAlarmlogs);
  return (
    <>
      <Title1     
        type="alarmas"   
        text={`Alarma "${currentAlarm.nombre}"`}
      />
      <Breadcumb />
      
      <Title2     
        type="historial"   
        text={`Historial de disparos y reseteos`}
      />
      {/* <EntityTable /> */}
    </>
  );
};

export default ViewAlarm;

