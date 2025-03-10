  
import { useEffect, useState } from "react";

import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import { Title2 } from '../../components/Title2/Title2.jsx';
import ButtonsBar from "../../components/ButtonsBar/ButtonsBar.jsx";
import CardChannelInfo from "../../components/CardChannelInfo/CardChannelInfo.jsx";

import { useDashboard } from '../../context/DashboardContext';
import { useAuth } from "../../context/AuthContext.jsx";
import { useLocation } from 'react-router-dom';
import { ENV } from "../../context/env.js";



const Channels = () => {  


  const location = useLocation();  
  const fullPath =  location.pathname.split('/').filter(path => path !== '');    
  
  const { dataloggers, channels, loadChannels, alarms } = useDashboard();
  const {user} = useAuth();

  const indexDataloggerIdPath = fullPath.indexOf('dataloggers') + 1;
  const dataloggerId = fullPath[indexDataloggerIdPath];
  const [loading, setLoading] = useState(false);


  
  const currentDatalogger = dataloggers.filter(datalogger => datalogger.id == dataloggerId);
  const currentChannels = channels.filter(channel => channel.datalogger_id == dataloggerId)
  const currentAlarms = alarms.filter(alarm => alarm.datalogger_id == dataloggerId);

  const currentPageIcon =
  ENV.ICONS.find(({ nameSection }) => nameSection === 'canales') ||
  ENV.ICONS.find(({ nameSection }) => nameSection === "default");    


  useEffect(() => {
    setLoading(true);
    loadChannels(user);
    setLoading(false);
  }, [channels])

  if (loading) {
    <div>Loading...</div>
  }
  //console.log(user)

  return (
    <>
      <Title1
        type="canales"
        text="Canales"
      />
      <Breadcumb />
      <Title2
        type="canales"
        text={`Canales de "${currentDatalogger[0]?.nombre || ''}"`}
      />     
      <ButtonsBar
        itemsName={`dataloggers/${currentDatalogger[0].id}/canales`}
        itemsQty={currentChannels.length}
        showAddButton={user.espropietario == 1}
      />

      <section className="cards-container" key="channels">   
        { currentChannels.map((channel) => {
          const currentAlarmsByChannel = currentAlarms.filter(alarm => alarm.canal_id == channel.canal_id);          
          return(
          <CardChannelInfo    
            key={`channel_${channel.canales_id}`}                   
            title="canales"
            channel={channel}
            datalogger={currentDatalogger[0]}    
            alarms={currentAlarmsByChannel}
            iconSrc={`/icons/${currentPageIcon.fileName}`}        
          />)
          })
        }
      </section >
      
    </>
  );
};

export default Channels;
