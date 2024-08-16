import React from "react";
//import { useAuth } from '../context/AuthContext';
import { useParams } from "react-router-dom";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction.jsx";

//import "./Users.css";


const Channels = () => {
  //const { user } = useAuth();
  const { id, channelId } = useParams();
  return (
    <>
      <Title1
        type="canales"
        text="Canales"
      />
      <Breadcumb />

      <UnderConstruction></UnderConstruction>
    </>
  );
};

export default Channels;
