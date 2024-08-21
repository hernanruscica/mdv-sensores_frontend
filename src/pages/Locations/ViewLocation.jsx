import React, { useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from "../../context/DashboardContext";
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { useParams } from "react-router-dom";
//import UnderConstruction from "../../components/UnderConstruction/UnderConstruction"; 
import CardLocationDetails from "../../components/CardLocationDetails/CardLocationDetails";

//import "./Dataloggers.css";

const ViewLocation = () => {  
  const { user } = useAuth();
  const { locations, dataloggers, channels, alarms, loadAllData} = useDashboard();
  const { id } = useParams();
  
  useEffect(() => {
    const loadData = async () => {
      await loadAllData(user.id);     
      console.log(locations) 
    };
    loadData();
  }, [user.id])
  return (
    <>
      <Title1     
        type="ubicaciones"   
        text={locations.find(location => location.ubicaciones_id == id)?.ubicaciones_nombre || 'ubicacion no encontrada'}
      />
      <Breadcumb />
      {/* <UnderConstruction></UnderConstruction> */}
      <CardLocationDetails id={id} type='ubicaciones' locations={locations} dataloggers={dataloggers} channels={channels} alarms={alarms} /> 

    </>
  );
};

export default ViewLocation;
