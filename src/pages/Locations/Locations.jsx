import React, { useEffect } from "react";
//import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useDashboard } from '../../context/DashboardContext.jsx';
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import CardLocationInfo from '../../components/CardLocationInfo/CardLocationInfo.jsx'

//import "./Locations.css";


const Locations = () => {
  const { user } = useAuth();
  const {locations, loadLocations, dataloggers, loadDataloggers} = useDashboard();

  const title = 'Ubicaciones';    

 // Cargar las locations al actualizar la pagina
 useEffect(() => {
  loadLocations(user.id);  
}, []); 

  return (
    <>
      <Title1     
        type="ubicaciones"             
        text={title}
      />
      <Breadcumb />
      <ButtonsBar itemsName='ubicaciones' />
      <section className="cards-container">
        {locations.map((location) => (
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

export default Locations;
