import React, { useEffect, useState } from "react";
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
import createApiClient from '../../api/apiClient.js' ;


const ViewLocation = () => {  
  const { user } = useAuth();
  const { locations, dataloggers, channels, alarmsLocation} = useDashboard();
  const { id } = useParams();
  const [ loading, setLoading] = useState(false);
  const [dataloggersByLocation, setDataloggersByLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);  

  const apiClient = createApiClient();

  const loadCurrentlocationData = async (id) => {
    try{
      const response = await apiClient.get(`/api/locations/${id}`);      
      setCurrentLocation(response.data.location);
    }catch(error){
      console.log(`failed to load current location data`, error);
    }
  }
  

  useEffect(() => {
    setLoading(true);
    loadCurrentlocationData(id);
    setDataloggersByLocation(dataloggers.filter(datalogger => datalogger.ubicacion_id == id));     
    setLoading(false);
  }, [user.id, id]);
  
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  //console.log(currentLocation);
  return (
    <>
      <Title1     
        type="ubicaciones"   
        text={currentLocation.nombre}
      />
      <Breadcumb />
      {/* <UnderConstruction></UnderConstruction> */}
      <CardLocationDetails id={id} type='ubicaciones' 
          location={currentLocation} 
          dataloggers={dataloggersByLocation} 
          channels={channels} 
          alarms={alarmsLocation} /> 
      <Title2 
        type="dataloggers"
        text="dataloggers en esta ubicacion"
      />
      <ButtonsBar itemsName='dataloggers' itemsQty={dataloggersByLocation?.length || 0}/>
       <section className="cards-container">        
         {dataloggersByLocation.map((datalogger) => {
          const currentLocation = locations.find(location => location.ubicaciones_id == datalogger.ubicacion_id);
          const currentChannels = channels.filter(channel => channel.datalogger_id == datalogger.id);    
          const currentAlarms = alarmsLocation.filter(alarm => alarm.datalogger_id == datalogger.id);      
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
