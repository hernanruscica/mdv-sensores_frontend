import React, { useEffect, useState } from "react";

import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";

import createApiClient from '../../api/apiClient.js' ;
import CardUserDetails from '../../components/CardUserDetails/CardUserDetails.jsx';
import CardLocationInfo from "../../components/CardLocationInfo/CardLocationInfo.jsx";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';


//import "./Dataloggers.css";

const ViewUser = () => {
  
  
  const {  dataloggers, channels, alarms } = useDashboard();
  const { id } = useParams();
  const [ currentUser, setCurrentUser] = useState([]);  
  const [ currentUserLocations, setCurrentUserLocations] = useState([]);  
  const [ loading, setLoading] = useState(true);
  const apiClient = createApiClient();

  const loadCurrentUserData = async (userId) => {
    try{
      const response = await apiClient.get(`/api/users/${userId}`);
      setCurrentUser(response.data.user);
      ///api/locationsusers/locationsbyuser/32
      const response2 = await apiClient.get(`/api/locationsusers/locationsbyuser/${userId}`)      
      setCurrentUserLocations(response2.data.locationUserData);
    }catch(error){
      console.log(`failed to load current user data`, error);
    }
  }
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadCurrentUserData(id);              
      
      setLoading(false);
    }
    loadData();
  }, [id]);    

 

  if (loading ) {   
    //console.log(locations)
    return <div>Cargando...</div>;
  }  


  return (
    <>
      <Title1     
        type="usuarios"   
        text={`Perfil de ${currentUser?.nombre_1 || ''}`}
      />
      <Breadcumb />
            
      <CardUserDetails user={currentUser} 
          type="usuarios"
          locations={currentUserLocations}
          dataloggers={dataloggers}
          channels={channels}
          alarms={alarms}
          />
        <Title2 
        type="ubicaciones"   
        text="Ubicaciones para el usuario."
        />
        <ButtonsBar 
        itemsName="ubicaciones"
        itemsQty={currentUserLocations.length}
        />
        <section className="cards-container">
        {currentUserLocations.map((location) => (
          <CardLocationInfo type='ubicaciones' 
            key={location.ubicaciones_id}
            locationData={location}             
            dataloggers={dataloggers}
          />
        ))}
      </section>

      
      
    </>
  );
};

export default ViewUser;
