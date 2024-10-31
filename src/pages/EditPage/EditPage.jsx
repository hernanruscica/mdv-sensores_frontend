import React from "react";
import { useParams, useLocation } from 'react-router-dom';

import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import LocationForm from "../../components/forms/LocationForm.jsx";
import DataloggerForm from "../../components/forms/DataloggerForm.jsx";
import ChannelForm from "../../components/forms/ChannelForm.jsx";
import AlarmForm from "../../components/forms/AlarmForm.jsx";


import './EditPage.css'

const formComponents = {
  users: UserForm,     
  locations: LocationForm,
  dataloggers: DataloggerForm,
  channels: ChannelForm,
  alarms: AlarmForm,
};


const EditPage = () => {

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

  
  return (
    <>    
    <Title1
        type="edicion"
        text={`Página de edición de ${entidad}`}
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

export default EditPage;
