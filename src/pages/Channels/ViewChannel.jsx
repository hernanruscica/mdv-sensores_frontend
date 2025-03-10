import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import CardChannelDetails from '../../components/CardChannelDetails/CardChannelDetails';
import createApiClient from '../../api/apiClient';
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import CardAlarmInfo from "../../components/CardAlarmInfo/CardAlarmInfo.jsx";
import CardChannelGraphic from "../../components/CardChannelGraphic/CardChannelGraphic.jsx";
import { ENV } from "../../context/env.js";
import './viewchannel.css';


const ViewChannel = () => {
  const apiClient = createApiClient(); 
  const { user } = useAuth();
  const { dataloggers, alarms, loadChannels, loadAlarms } = useDashboard();
  const { id, channelId} = useParams();
  const [ loading, setLoading] = useState(true);
  const [ loading2, setLoading2] = useState(true);
  const [ currentChannel, setCurrentChannel] = useState([]);
  const [ currentDatalogger, setCurrentDatalogger] = useState([]);
  const [ currentAlarms, setCurrentAlarms] = useState([]);
  const [ dataChannel, setDataChannel] = useState([]);
  const [ firstAlarmPorcentage, setFirstAlarmPorcentage] = useState(null);

  const hoursBackView = 120;

  const alarmIcon =
  ENV.ICONS.find(({ nameSection }) => nameSection === 'alarmas') ||
  ENV.ICONS.find(({ nameSection }) => nameSection === "default");

  useEffect(() => {
    const loadData = async () =>{
      setLoading(true);
       await loadChannels(user);
       await loadAlarms(user.id);
      const response = await apiClient.get(`/api/channels/${channelId}`);      
      
      setCurrentChannel(response.data.channel);
      setCurrentDatalogger(dataloggers.find(datalogger => datalogger.id == id));
      setCurrentAlarms(alarms.filter(alarm => alarm.canal_id == channelId));      
      setLoading(false);
    };
    loadData();
    //console.log(currentAlarms,currentAlarms.find(alarm=>alarm.tipo_alarma == "PORCENTAJE_ENCENDIDO"))
    
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
    if (!loading) {
      loadData();
      setFirstAlarmPorcentage(currentAlarms.find(alarm=>alarm.tipo_alarma == "PORCENTAJE_ENCENDIDO") );
    }
  }, [currentChannel, currentDatalogger]);


  if (loading) {
    return <div>Cargando...</div>;
  }
  
  //console.log(currentChannel) 
  return (
    <>
      <Title1     
        type="canales"   
        text={`Canal "${currentChannel.nombre}" del datalogger "${currentDatalogger.nombre}"`}
      />
      <Breadcumb />
      {
         (currentAlarms.length > 0 &&  firstAlarmPorcentage  && !loading2)?
        //  <p>{`hay alarmas del tipo '"PORCENTAJE_ENCENDIDO"'${firstAlarmPorcentage}`}</p>
         <div className="channel-showcase-gauge-card-container">
          
            <CardChannelDetails 
                channel={currentChannel}
                datalogger={currentDatalogger}
                alarms={currentAlarms}
              />            
          
          
            <CardAlarmInfo 
                key={firstAlarmPorcentage.nombre + firstAlarmPorcentage.id}
                title='alarmas'
                name={firstAlarmPorcentage.nombre}
                id={firstAlarmPorcentage.id}
                alarm={firstAlarmPorcentage}
                channel={currentChannel}
                lastReadData={dataChannel[dataChannel.length-1]}   
                iconSrc={`/icons/${alarmIcon.fileName}`}       
              />
          
         </div>
         : 
         <CardChannelDetails 
            channel={currentChannel}
            datalogger={currentDatalogger}
            alarms={currentAlarms}
          />
      }
      
      {
        (loading2) 
        ? <div>Cargando...</div>
        : 
         <CardChannelGraphic 
            dataChannel= {dataChannel}
            currentChannelName = {currentChannel.nombre}
            currentChannelTimeProm = {currentChannel.tiempo_a_promediar}
         />      
      }      
        <Title2
          type="alarmas"
          text={`Alarmas activas para el canal "${currentChannel?.nombre || ''}"`}
        />
        <ButtonsBar
          itemsName={`dataloggers/${currentDatalogger.id}/canales/${currentChannel.id}/alarmas`}
          itemsQty={currentAlarms.length}
          showAddButton={user.espropietario == 1}
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
          iconSrc={`/icons/${alarmIcon.fileName}`}       
        />
      ))
      :
        <div>No hay alarmas vigentes para este</div>
      }
     
    </>
  );
};

export default ViewChannel;
