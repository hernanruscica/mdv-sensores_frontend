import React, { useEffect } from "react";
import { ENV } from "../../context/env.js";
import { useAuth } from '../../context/AuthContext.jsx';
import { useDashboard } from '../../context/DashboardContext.jsx';
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import CardLocationInfo from '../../components/CardLocationInfo/CardLocationInfo.jsx'

//import "./Locations.css";


const Locations = () => {
  const { user } = useAuth();
  const {locations, loadLocations, dataloggers} = useDashboard();
  const title = 'Ubicaciones';      

  const currentPageIcon =
  ENV.ICONS.find(({ nameSection }) => nameSection === 'ubicaciones') ||
  ENV.ICONS.find(({ nameSection }) => nameSection === "default");

 useEffect(() => {
  loadLocations(user.id);  
}, [user.id]); 

  return (
    <>
      <Title1     
        type="ubicaciones"             
        text={title}
      />
      <Breadcumb />
      <ButtonsBar itemsName='ubicaciones' itemsQty={locations.length}/>
      <section className="cards-container">
        {locations.map((location) => (
          <CardLocationInfo type='ubicaciones' 
            key={location.ubicaciones_id}
            locationData={location}             
            dataloggers={dataloggers}
            iconSrc={`/icons/${currentPageIcon.fileName}`}
            currentUser={user}
          />
        ))}
      </section>
    </>
  );
};

export default Locations;
