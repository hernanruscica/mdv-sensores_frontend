import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";

//import "./Dataloggers.css";

const ViewLocation = (props) => {
  
  //const { user } = useAuth();
  const { id } = useParams();
  return (
    <>
      <Title1     
        type="ubicaciones"   
        text={`Ubicacion nombre con id: ${id}`}
      />
      <Breadcumb />
    </>
  );
};

export default ViewLocation;
