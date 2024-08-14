import React from "react";
import { Link } from "react-router-dom";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
import CardLocationInfo from '../../components/CardLocationInfo/CardLocationInfo.jsx'

//import "./Locations.css";


const Locations = () => {
  //const { user } = useAuth();
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
  return (
    <>
      <Title1     
        type="ubicaciones"             
        text={title}
      />
      <Breadcumb />
      <ButtonsBar itemsName='ubicaciones' />
      <section className="cards-container">
          <CardLocationInfo type='ubicaciones' 
            locationData={currentLocation} 
            userData={currentUser} 
            dataloggers={currentDataloggers}
          />
          <CardLocationInfo type='ubicaciones' 
            locationData={currentLocation} 
            userData={currentUser} 
            dataloggers={currentDataloggers}
          />
          <CardLocationInfo type='ubicaciones' 
            locationData={currentLocation} 
            userData={currentUser} 
            dataloggers={currentDataloggers}
          />
      </section>
    </>
  );
};

export default Locations;
