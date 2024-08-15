import React, { useEffect } from "react";
import { useAuth } from '../../context/AuthContext.jsx';
import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1";

import Breadcumb from "../../components/Breadcumb/Breadcumb";
import "./Dashboard.css";

import CardCategoriesInfo from "../../components/CardCategoriesInfo/CardCategoriesInfo";

const Dashboard = () => {
  const { user } = useAuth();
  const { locations, loadLocations } = useDashboard();

  // Cargar las locations al actualizar la pagina
  useEffect(() => {
    loadLocations(user.id);
  }, []); 

  // console.log(user, token);
  // console.log(locations.locationUserData);

  return (
    <>
      <Title1 
        type="panel"
        text="Panel de Control" 
      />
      <Breadcumb />

      <section className="cards-container">
        <CardCategoriesInfo key="locations" title="ubicaciones" itemsQty={locations.count || 0} />
        <CardCategoriesInfo key="users" title="usuarios" itemsQty='4'/>
        <CardCategoriesInfo key="dataloggers" title="dataloggers" itemsQty='2'/>
      </section>      
    </>
  );
};

export default Dashboard;
