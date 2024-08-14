import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";

//import "./Dataloggers.css";

const ViewUser = (props) => {
  
  //const { user } = useAuth();
  const { id } = useParams();
  return (
    <>
      <Title1     
        type="usuarios"   
        text={`Usuario nombre con id: ${id}`}
      />
      <Breadcumb />
    </>
  );
};

export default ViewUser;
