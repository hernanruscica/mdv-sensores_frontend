import React from "react";
import { useParams, useLocation } from 'react-router-dom';

import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import CreateUserForm from "../../components/forms/CreateUserForm.jsx";
import CreateLocationForm from "../../components/forms/CreateLocationForm.jsx";
import CreateDataloggerForm from "../../components/forms/CreateDataloggerForm.jsx";
import CreateChannelForm from "../../components/forms/CreateChannelForm.jsx";
import CreateAlarmForm from "../../components/forms/CreateAlarmForm.jsx";
import DefaultForm from "../../components/forms/DefaultForm.jsx";

import './CreatePage.css'

const formComponents = {
  users: CreateUserForm,     
  locations: CreateLocationForm,
  dataloggers: CreateDataloggerForm,
  channels: CreateChannelForm,
  alarms: CreateAlarmForm,
  default: DefaultForm,
};


const CreatePage = () => {

  const location = useLocation();  
  const fullPath =  location.pathname.split('/').filter(path => path !== '');    
  const { dataloggerId, channelId } = useParams(); // Obtenemos el nombre de la entidad y el ID desde la URL   
  const entityNames = {
    usuarios: 'users',
    ubicaciones: 'locations',
    dataloggers: 'dataloggers',
    canales: 'channels',
    alarmas: 'alarms',
    default: 'default'
  }  
  let entidad = null;
  let currentId = null;  

  //para usuarios y locaciones
  if (dataloggerId == undefined){
    entidad = fullPath[1]    
  }else{
    //para dataloggers
    if (dataloggerId != undefined && channelId == undefined){
          entidad = fullPath[3]
          currentId = dataloggerId
        }else{
           entidad = fullPath[5]
      currentId = channelId;
        }
  }
  
  const entity = entityNames[entidad] || 'default';  
  const FormComponent = formComponents[entity];

  return (
    <>    
    <Title1
        type="edicion"
        text={`Página de creación de ${entidad}`}
      />
      <Breadcumb /> 

    <FormComponent 
      id={currentId}
      dataloggerId={dataloggerId || null}
      channelId={channelId || null}         
    />
    </>       
  );
};

export default CreatePage;
