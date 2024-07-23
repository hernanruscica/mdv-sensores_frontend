import React from "react";
//import { useAuth } from '../context/AuthContext';

import Breadcumb from "../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../components/Title1/Title1.jsx";

//import "./Users.css";


const Channels = () => {
  //const { user } = useAuth();

  return (
    <>
      <Title1
        text="canales"
      />
      <Breadcumb />
    </>
  );
};

export default Channels;
