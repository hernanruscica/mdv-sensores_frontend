import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 

//import "./Dataloggers.css";

const ViewAlarm = (props) => {
  
  //const { user } = useAuth();
  const { id } = useParams();
  return (
    <>
      <Title1     
        type="alarmas"   
        text={`Alarma con id: ${id}`}
      />
      <Breadcumb />
      <UnderConstruction></UnderConstruction>

    </>
  );
};

export default ViewAlarm;
