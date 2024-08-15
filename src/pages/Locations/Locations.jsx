import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useDashboard } from '../../context/DashboardContext.jsx';
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import CardLocationInfo from '../../components/CardLocationInfo/CardLocationInfo.jsx'

//import "./Locations.css";


const Locations = () => {
  const { user } = useAuth();
  const {locations, loadLocations} = useDashboard();

  const title = 'Ubicaciones';   
  const currentLocation = {
    name:'Ubicacion num 1', 
    id:'1',
    description: 'Descripcion generica de una ubicacion, como direccion, nombre, localidad, y/o alguna particularidad'
  };
  const currentUser = {
    id: 1,
    rol: 'administrador'
  };
  const currentDataloggers = [
    {
      name: 'Datalogger 1',
      id: 1
    },
    {
      name: 'Datalogger 2',
      id: 2
    },
    {
      name: 'Datalogger 3',
      id: 3
    }
]

 // Cargar las locations al actualizar la pagina
 useEffect(() => {
  loadLocations(user.id);
  console.log(locations.locationUserData);
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
        {locations.locationUserData.map((location) => (
          <CardLocationInfo type='ubicaciones' 
            key={location.ubicaciones_id}
            locationData={location} 
            userData={currentUser} 
            dataloggers={currentDataloggers}
          />
        ))}
      </section>
    </>
  );
};

export default Locations;
