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
import { ENV } from "../../context/env.js";

const ViewDatalogger = () => {
  const apiClient = createApiClient();
  const { id } = useParams();
  const { user } = useAuth();
  const { channels, alarms, loadChannels, loadAlarms, loadDataFromDatalogger } = useDashboard();
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
    { header: 'NOMBRE', key: 'nombre', iconName: 'bell-regular.svg' },
    { header: 'CANAL', key: 'canal_nombre', iconName: 'chart-line-solid.svg' },
    { header: 'CONDICION', key: 'condicion', iconName: 'code-branch-solid.svg' },
  ];

  const channelsIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === 'canales') ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");    

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        loadCurrentDataloggerInfo(id),
        loadChannels(user),
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
        channels.filter(channel => channel.datalogger_id == currentDatalogger.id && channel.estado == 1)
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
        itemsName={`dataloggers/${currentDatalogger.id}/canales`}
        itemsQty={channelsByCurrentDatalogger.length}
        showAddButton={user.espropietario == 1}
      />
      
      <section className="cards-container" key="channels">   
        { channelsByCurrentDatalogger.map((channel) => {
          const currentAlarmsByChannel = alarmsByCurrentDatalogger.filter(alarm => alarm.canal_id == channel.canales_id);          
          return(
          <CardChannelInfo    
            key={`channel_${channel.canales_id}`}                   
            title="canales"
            channel={channel}
            datalogger={currentDatalogger}    
            alarms={currentAlarmsByChannel}     
            iconSrc = {`/icons/${channelsIcon.fileName}`}   
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