import React, {useEffect, useState} from "react";
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
  const [loading, setLoading] = useState(false);
  const [activeDataloggers, setActiveDataloggers] = useState([]);
  const [activeChannels, setActiveChannels] = useState([]);

  const currentPageIcon =
  ENV.ICONS.find(({ nameSection }) => nameSection === 'dataloggers') ||
  ENV.ICONS.find(({ nameSection }) => nameSection === "default");    

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);        
      //await Promise.all([loadLocations(user), loadDataloggers(user), loadUsers(user.id), loadChannels(user), loadAlarms(user.id)]);
      setActiveDataloggers(dataloggers.filter(datalogger=>datalogger.estado == 1))
      setActiveChannels(channels.filter(channel=>channel.estado == 1));
      setLoading(false);
      }
      loadData();
  }, [user, dataloggers]);  

  if (loading) {
    return (
      <div className="loading">Cargando...</div>
    )
  }

  
  return (
    <>
      <Title1        
        type="dataloggers"
        text="Dataloggers"
      />
      <Breadcumb />
      <ButtonsBar 
        itemsName='dataloggers' 
        showAddButton={user.espropietario == 1}
        itemsQty={activeDataloggers.length}/>
      <section className="cards-container">        
        {activeDataloggers.map((datalogger) => {
          const currentLocation = locations.find(location => location.ubicaciones_id == datalogger.ubicacion_id);          
          const currentChannels = activeChannels.filter(channel => channel.datalogger_id == datalogger.id);    
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
