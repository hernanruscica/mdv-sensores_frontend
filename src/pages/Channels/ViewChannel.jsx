import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import { useDashboard } from "../../context/DashboardContext";
import CardChannelDetails from '../../components/CardChannelDetails/CardChannelDetails';

//import "./Dataloggers.css";

const ViewChannel = () => {
  
  const { user } = useAuth();
  const { dataloggers, channels, alarms, loadChannels, loadAlarms } = useDashboard();
  const { id, channelId} = useParams();
  const [ loading, setLoading] = useState(true);
  const [ currentChannel, setCurrentChannel] = useState([]);
  const [ currentDatalogger, setCurrentDatalogger] = useState([]);
  const [ currentAlarms, setCurrentAlarms] = useState([]);


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

    </>
  );
};

export default ViewChannel;
