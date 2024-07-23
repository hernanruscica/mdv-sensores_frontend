import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../components/Title1/Title1.jsx";
import Breadcumb from "../components/Breadcumb/Breadcumb.jsx";

//import "./Locations.css";


const Locations = () => {
  //const { user } = useAuth();
  const title = 'ubicaciones';   

  return (
    <>
      <Title1                  
        text={title}
      />
      <Breadcumb />
    </>
  );
};

export default Locations;
