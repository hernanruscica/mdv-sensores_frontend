import React, { useEffect } from "react";
import { useAuth } from '../../context/AuthContext.jsx';
import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1";
import { ENV } from "../../context/env";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import "./Dashboard.css";

import CardCategoriesInfo from "../../components/CardCategoriesInfo/CardCategoriesInfo";

const Dashboard = () => {
  const { user } = useAuth();
  const { locations, loadLocations, dataloggers, loadDataloggers, users, loadUsers,  loadChannels,  loadAlarms } = useDashboard();  

  const locationsIcon =   ENV.ICONS.find(({ nameSection }) => nameSection === 'ubicaciones') ||   ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  const usersIcon =   ENV.ICONS.find(({ nameSection }) => nameSection === 'usuarios') ||   ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  const dataloggersIcon =   ENV.ICONS.find(({ nameSection }) => nameSection === 'dataloggers') ||   ENV.ICONS.find(({ nameSection }) => nameSection === "default");

  // Cargar las locations al actualizar la pagina
  useEffect(() => {
    const loadData = async () => {
      await loadLocations(user.id);
      await loadDataloggers(user.id);
      await loadUsers(user.id);
      await loadChannels(user.id);
      await loadAlarms(user.id)
      //console.log(alarms);
      }
      loadData();
  }, [user.id]);  
  
  return (
    <>
      <Title1 
        type="panel"
        text="Panel de Control" 
      />
      <Breadcumb />      
      <section className="cards-container">
        <CardCategoriesInfo key="locations" title="ubicaciones" itemsQty={locations?.length || 0} iconSrc={`/icons/${locationsIcon.fileName}`} />
        <CardCategoriesInfo key="users" title="usuarios" itemsQty={users?.length || 0} iconSrc={`/icons/${usersIcon.fileName}`}/>
        <CardCategoriesInfo key="dataloggers" title="dataloggers" itemsQty={dataloggers?.length || 0} iconSrc={`/icons/${dataloggersIcon.fileName}`}/>
      </section>      
    </>
  );
};

export default Dashboard;
