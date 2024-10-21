import React from "react";
//import { useAuth } from '../context/AuthContext';

import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import { Title2 } from '../../components/Title2/Title2.jsx';
import EntityTable from "../../components/EntityTable/EntityTable.jsx";

import { useDashboard } from '../../context/DashboardContext';
import { useLocation } from 'react-router-dom';



const Alarms = () => {
  
  const location = useLocation();  
  const fullPath =  location.pathname.split('/').filter(path => path !== '');    
  
  const { dataloggers, channels, alarms } = useDashboard();

  const indexDataloggerIdPath = fullPath.indexOf('dataloggers') + 1;
  const dataloggerId = fullPath[indexDataloggerIdPath];
  let currentDatalogger = dataloggers.find(datalogger => datalogger.id == dataloggerId);


  const indexChannelIdPath = fullPath.indexOf('canales') !== -1 ? fullPath.indexOf('canales')  + 1 : -1;
  let currentChannel = null;
  let currentAlarms = null;
  let columns = null;
  
  if (indexChannelIdPath !== -1){
    //if the url brings datalogger id and channel id
    const channelId = fullPath[indexChannelIdPath];
    currentChannel = channels.find(channel => channel.canal_id == channelId);  
    currentAlarms = alarms.filter(Alarm => Alarm.canal_id == channelId);
    columns = [
    { header: 'NOMBRE', key: 'nombre' },
    { header: 'CONDICION', key: 'condicion' },
    
  ];
  }else{
    //if the url only brings datalogger id    
    
    currentAlarms = alarms.filter(Alarm => Alarm.datalogger_id == dataloggerId);
    columns = [
      { header: 'NOMBRE', key: 'nombre' },
      {header: 'CANAL', key: 'canal_nombre'},
      { header: 'CONDICION', key: 'condicion' }
    ]
  }
 

  return (
    <>
      <Title1
        type="alarmas"
        text={`Alarmas activas. `}
      />
      
      <Breadcumb />
      <Title2
        type="alarmas"
        text= {`Alarmas activas para el ${(indexChannelIdPath !== -1) 
          ? (`canal`)
          : (`datalogger`)
            }`}
      />
      <p>
  {currentChannel !== undefined && currentChannel !== null ? (
    <>
      <span>Estas son las alarmas activas para el canal </span>
      <strong>{currentChannel.canal_nombre}</strong>
      <span> del datalogger </span>
      <strong>{currentDatalogger.nombre}</strong>
    </>
  ) : (
    <>
      <span>Estas son las alarmas activas para el datalogger </span>
      <strong>{currentDatalogger.nombre}</strong>
    </>
  )}
</p>


      <EntityTable 
        data={currentAlarms} 
        columns={columns}         
        entityType="alarmas"
      />   
      
    </>
  );
};

export default Alarms;
