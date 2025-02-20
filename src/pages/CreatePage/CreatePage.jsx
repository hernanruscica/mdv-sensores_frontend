import React from "react";
import { useParams, useLocation } from 'react-router-dom';

import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import CreateUserForm from "../../components/forms/CreateUserForm.jsx";
import LocationForm from "../../components/forms/LocationForm.jsx";
import CreateLocationForm from "../../components/forms/CreateLocationForm.jsx"
import DataloggerForm from "../../components/forms/DataloggerForm.jsx";
import ChannelForm from "../../components/forms/ChannelForm.jsx";
import AlarmForm from "../../components/forms/AlarmForm.jsx";


import './CreatePage.css'

const formComponents = {
  users: CreateUserForm,     
  locations: CreateLocationForm,
  dataloggers: DataloggerForm,
  channels: ChannelForm,
  alarms: AlarmForm,
};


const CreatePage = () => {

  const location = useLocation();  
  const fullPath =  location.pathname.split('/').filter(path => path !== '');  
  
  const { id, channelId, alarmId } = useParams(); // Obtenemos el nombre de la entidad y el ID desde la URL  

 
  const entityNames = {
    usuarios: 'users',
    ubicaciones: 'locations',
    dataloggers: 'dataloggers',
    canales: 'channels',
    alarmas: 'alarms',
  }

  
  let entidad = null;
  let currentId = null;

  if( channelId == undefined && alarmId == undefined){
    entidad = fullPath[1];
    currentId = id
  }else{
    if ( channelId != undefined && alarmId == undefined){
      entidad = fullPath[3];
      currentId = channelId;
    }else{
      entidad = fullPath[5];
      currentId = alarmId;
    }
  }
  const entity = entityNames[entidad];  

  const FormComponent = formComponents[entity];

  //console.log(entity)
  
  return (
    <>    
    <Title1
        type="edicion"
        text={`Página de creación de ${entidad}`}
      />
      <Breadcumb /> 

    <FormComponent 
      id={currentId}
      dataloggerId={id || null}
      channelId={channelId || null}
      alarmId={alarmId || null}    
    />

    </>     
    
  );
};

export default CreatePage;
