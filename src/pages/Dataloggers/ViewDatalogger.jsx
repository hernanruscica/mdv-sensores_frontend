import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import createApiClient from "../../api/apiClient";
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import CardDataloggerDetails from "../../components/CardDataloggerDetails/CardDataloggerDetails";
import CardChannelInfo from '../../components/CardChannelInfo/CardChannelInfo.jsx';
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import EntityTable from "../../components/EntityTable/EntityTable.jsx";

const ViewDatalogger = () => {
  const apiClient = createApiClient();
  const { id } = useParams();
  const { user } = useAuth();
  const { channels, alarms, loadChannels, loadAlarms, dataFromDatalogger, loadDataFromDatalogger } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [loading02, setLoading02] = useState(true); 
  const [currentDatalogger, setCurrentDatalogger] = useState(null);
  const [channelsByCurrentDatalogger, setChannelsByCurrentDatalogger] = useState([]);
  const [alarmsByCurrentDatalogger, setAlarmsByCurrentDatalogger] = useState([]);

  const loadCurrentDataloggerInfo = async (dataloggerId) => {
    try {
      const response = await apiClient.get(`/api/dataloggers/${dataloggerId}`);
      setCurrentDatalogger(response.data.datalogger);
    } catch (error) {
      console.error("Error loading datalogger info:", error);
    }
  }

  const columns = [
    { header: 'NOMBRE', key: 'nombre' },
    { header: 'CANAL', key: 'canal_nombre' },
    { header: 'VALOR', key: 'max' },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        loadCurrentDataloggerInfo(id),
        loadChannels(user.id),
        loadAlarms(user.id),      
      ]);
      setLoading(false);
    }
    loadData();
  }, [id, user.id]);
  
  useEffect(() => {
    const loadData = async () => {   
      setLoading02(true);   
      await loadDataFromDatalogger(currentDatalogger.nombre_tabla, 2880)      
      setLoading02(false);
    }
    if (currentDatalogger && channels.length > 0) {
      setChannelsByCurrentDatalogger(
        channels.filter(channel => channel.datalogger_id == currentDatalogger.id)
      );
      setAlarmsByCurrentDatalogger(
        alarms.filter(alarm => alarm.datalogger_id == currentDatalogger.id)
      );  
      loadData();
    }
  }, [currentDatalogger]);
  
  if (loading || loading02) {
    return <div>Cargando...</div>;
  }
  // console.log(dataFromDatalogger);

  //console.log(alarmsByCurrentDatalogger)
  return (
    <>
      <Title1
        type="dataloggers"
        text={`Datalogger: "${currentDatalogger?.nombre || ''}"`}
      />
      <Breadcumb />
      <CardDataloggerDetails
        datalogger={currentDatalogger}
        channels={channelsByCurrentDatalogger}
        alarms={alarmsByCurrentDatalogger}
      />
      <Title2
        type="canales"
        text={`Canales de "${currentDatalogger?.nombre || ''}"`}
      />
      <ButtonsBar
        itemsName="canales"
        itemsQty={channelsByCurrentDatalogger.length}
      />
      
      <section className="cards-container" key="channels">   
        { channelsByCurrentDatalogger.map((channel) => {
          const currentAlarmsByChannel = alarmsByCurrentDatalogger.filter(alarm => alarm.canal_id == channel.canal_id);
          //console.log(currentAlarmsByChannel);
          return(
          <CardChannelInfo    
            key={`channel_${channel.canal_id}`}                   
            title="canales"
            channel={channel}
            datalogger={currentDatalogger}    
            alarms={currentAlarmsByChannel}        
          />)
          })
        }
      </section >
      

      <Title2
        type="alarmas"
        text={`Alarmas programadas en "${currentDatalogger?.nombre || ''}"`}
      />
       <EntityTable 
        data={alarmsByCurrentDatalogger} 
        columns={columns}         
        entityType="alarmas"
      />   
    </>
  );
};

export default ViewDatalogger;