import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../components/Title1/Title1";
import Breadcumb from "../components/Breadcumb/Breadcumb";  

//import "./Dataloggers.css";

const Dataloggers = () => {
  //const { user } = useAuth();
  return (
    <>
      <Title1        
        text="dataloggers"
      />
      <Breadcumb />
    </>
  );
};

export default Dataloggers;
