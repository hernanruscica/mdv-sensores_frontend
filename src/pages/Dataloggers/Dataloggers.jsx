import React, {useEffect} from "react";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from "../../context/DashboardContext.jsx";
import { ENV } from "../../context/env.js";
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";   
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar';
import CardDataloggerInfo from '../../components/CardDataloggerInfo/CardDataloggerInfo'
import "./Dataloggers.css";

const Dataloggers = () => {
  const { user } = useAuth();
  const { locations, loadLocations, dataloggers, loadDataloggers, loadUsers, channels, loadChannels, alarms, loadAlarms } = useDashboard(); 

  const currentPageIcon =
  ENV.ICONS.find(({ nameSection }) => nameSection === 'dataloggers') ||
  ENV.ICONS.find(({ nameSection }) => nameSection === "default");    

  useEffect(() => {
    const loadData = async () => {
      await loadLocations(user.id);
      await loadDataloggers(user.id);
      await loadUsers(user.id);
      await loadChannels(user.id);
      await loadAlarms(user.id)      
      }
      loadData();
  }, [user.id]);  

  return (
    <>
      <Title1        
        type="dataloggers"
        text="Dataloggers"
      />
      <Breadcumb />
      <ButtonsBar itemsName='dataloggers' itemsQty={dataloggers.length}/>
      <section className="cards-container">        
        {dataloggers.map((datalogger) => {
          const currentLocation = locations.find(location => location.ubicaciones_id == datalogger.ubicacion_id);
          const currentChannels = channels.filter(channel => channel.datalogger_id == datalogger.id);    
          const currentAlarms = alarms.filter(alarm => alarm.datalogger_id == datalogger.id)      
          return (
          <CardDataloggerInfo 
            key={datalogger.id}
            name={datalogger.nombre} id={datalogger.id}  
            location={currentLocation} 
            channels={currentChannels} 
            alarms={currentAlarms}
            iconSrc={`/icons/${currentPageIcon.fileName}`}/>
          )}
        )}
      </section>
    </>
  );
};

export default Dataloggers;
