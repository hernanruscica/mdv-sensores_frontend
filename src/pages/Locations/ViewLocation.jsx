import React, { useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from "../../context/DashboardContext";
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import CardLocationDetails from "../../components/CardLocationDetails/CardLocationDetails";

//import "./Dataloggers.css";

const ViewLocation = () => {  
  const { user } = useAuth();
  const { locations, loadLocations} = useDashboard();
  const { id } = useParams();
  
  useEffect(() => {
    const loadData = async () => {
      await loadLocations(user.id);
      
    };
    loadData();
  }, [user.id])
  return (
    <>
      <Title1     
        type="ubicaciones"   
        text={`Ubicacion nombre con id: ${id}`}
      />
      <Breadcumb />
      {/* <UnderConstruction></UnderConstruction> */}
      <CardLocationDetails id={id}/> 

    </>
  );
};

export default ViewLocation;
