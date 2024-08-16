import React from "react";
//import { useAuth } from '../context/AuthContext';

import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction.jsx";

//import "./Users.css";


const Alarms = () => {
  //const { user } = useAuth();

  return (
    <>
      <Title1
        type="alarmas"
        text="Alarmas"
      />
      <Breadcumb />
      <UnderConstruction></UnderConstruction>
    </>
  );
};

export default Alarms;
