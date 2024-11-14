import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from "../../context/DashboardContext";
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import CardLocationDetails from "../../components/CardLocationDetails/CardLocationDetails";
import CardDataloggerInfo from "../../components/CardDataloggerInfo/CardDataloggerInfo";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar'
import createApiClient from '../../api/apiClient.js' ;
import { ENV } from "../../context/env.js";


const ViewLocation = () => {  
  const { user } = useAuth();
  const { locations, dataloggers, channels, alarms, loadLocations} = useDashboard();
  const { id } = useParams();
  const [ loading, setLoading] = useState(false);
  const [dataloggersByLocation, setDataloggersByLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);  

  const apiClient = createApiClient();

  const currentPageIcon =
  ENV.ICONS.find(({ nameSection }) => nameSection === 'dataloggers') ||
  ENV.ICONS.find(({ nameSection }) => nameSection === "default");    

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
    setDataloggersByLocation(dataloggers.filter(datalogger => datalogger.ubicacion_id == id));   
    loadLocations(user.id);
    loadCurrentlocationData(id);        
    setLoading(false);
  }, [user.id, id]);
  
  
  if (loading) {
    return <div>Cargando...</div>;
  }    

  //console.log(currentLocation)
  
  const dataloggerIds = dataloggersByLocation.map(datalogger => datalogger.id);  
  const currentAlarms = alarms.filter(alarm => dataloggerIds.includes(alarm.datalogger_id)); 
 
  return (
    <>
      <Title1     
        type="ubicaciones"   
        text={currentLocation.nombre}
      />
      <Breadcumb />

      <CardLocationDetails id={id} type='ubicaciones' 
          location={currentLocation} 
          dataloggers={dataloggersByLocation} 
          channels={channels} 
          alarms={currentAlarms} /> 
      <Title2 
        type="dataloggers"
        text="dataloggers en esta ubicacion"
      />
      <ButtonsBar itemsName='dataloggers' itemsQty={dataloggersByLocation?.length || 0}/>
       <section className="cards-container">        
         {dataloggersByLocation.map((datalogger) => {
          const currentLocation = locations.find(location => location.ubicaciones_id == datalogger.ubicacion_id);
          const currentChannels = channels.filter(channel => channel.datalogger_id == datalogger.id);    
          
          return (
          <CardDataloggerInfo title='dataloggers' key={datalogger.id}
            name={datalogger.nombre} id={datalogger.id}  
            location={currentLocation} 
            channels={currentChannels} 
            alarms={currentAlarms}
            iconSrc={`${ENV.URL}/icons/${currentPageIcon.fileName}`}/>
          )}
        )} 
      </section> 
    </>
  );
};

export default ViewLocation;
