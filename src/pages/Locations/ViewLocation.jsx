import React, { useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from "../../context/DashboardContext";
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
//import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import CardLocationDetails from "../../components/CardLocationDetails/CardLocationDetails";
import CardDataloggerInfo from "../../components/CardDataloggerInfo/CardDataloggerInfo";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar'

//import "./Dataloggers.css";

const ViewLocation = () => {  
  const { user } = useAuth();
  const { locations, dataloggers, channels, alarms, alarmsLocation, loadAllData} = useDashboard();
  const { id } = useParams();
  const dataloggersByLocation = dataloggers.filter(datalogger => datalogger.ubicacion_id == id); 
  
  useEffect(() => {
    const loadData = async () => {
      await loadAllData(user.id, id);         
    };
    loadData();
  }, [user.id, id]) 
  return (
    <>
      <Title1     
        type="ubicaciones"   
        text={locations.find(location => location.ubicaciones_id == id)?.ubicaciones_nombre || 'ubicacion no encontrada'}
      />
      <Breadcumb />
      {/* <UnderConstruction></UnderConstruction> */}
      <CardLocationDetails id={id} type='ubicaciones' locations={locations} dataloggers={dataloggersByLocation} channels={channels} alarms={alarmsLocation} /> 
      <Title2 
        type="dataloggers"
        text="dataloggers en esta ubicacion"
      />
      <ButtonsBar itemsName='dataloggers' itemsQty={dataloggersByLocation?.length || 0}/>
      <section className="cards-container">        
        {dataloggersByLocation.map((datalogger) => {
          const currentLocation = locations.find(location => location.ubicaciones_id == datalogger.ubicacion_id);
          const currentChannels = channels.filter(channel => channel.datalogger_id == datalogger.id);    
          const currentAlarms = alarmsLocation.filter(alarm => alarm.datalogger_id == datalogger.id)      
          return (
          <CardDataloggerInfo title='dataloggers' key={datalogger.id}
            name={datalogger.nombre} id={datalogger.id}  
            location={currentLocation} 
            channels={currentChannels} 
            alarms={currentAlarms}/>
          )}
        )}
      </section>
    </>
  );
};

export default ViewLocation;
