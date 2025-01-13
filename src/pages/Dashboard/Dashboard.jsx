import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext.jsx';
import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1";
import { ENV } from "../../context/env";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import "./Dashboard.css";

import CardCategoriesInfo from "../../components/CardCategoriesInfo/CardCategoriesInfo";

const Dashboard = () => {
  const { user } = useAuth();
  const { locations, loadLocations, dataloggers, loadDataloggers, users, userLocation, loadUsers,  loadChannels,  loadAlarms, loadUserLocation } = useDashboard();  

  const locationsIcon =   ENV.ICONS.find(({ nameSection }) => nameSection === 'ubicaciones') ||   ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  const usersIcon =   ENV.ICONS.find(({ nameSection }) => nameSection === 'usuarios') ||   ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  const dataloggersIcon =   ENV.ICONS.find(({ nameSection }) => nameSection === 'dataloggers') ||   ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  const [ userHasSomeAdminRole, setUserHasSomeAdminRole] = useState(false);
  const [ userHasSomePropietaryRole, setUserHasSomePropietaryRole] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar las locations al actualizar la pagina
  useEffect(() => {
    
      const loadData = async () => {
        setLoading(true);
        await Promise.all([loadLocations(user.id), loadDataloggers(user.id), loadUsers(user.id), loadChannels(user.id)], loadAlarms(user.id), loadUserLocation(user.id));
        setLoading(false);        
      } 
      loadData();
      
  }, []);  

  useEffect(() => {
    setUserHasSomeAdminRole(userLocation.some(ul => ul.usuarios_roles_id >= 8));
    setUserHasSomePropietaryRole(userLocation.some(ul => ul.usuarios_roles_id == 9));
  }, [userLocation]);

  if (loading){
    return (
      <div>cargando...</div>
    )
  }
  //console.log(userLocation, userHasSomePropietaryRole)
  
  return (
    <>
      <Title1 
        type="panel"
        text="Panel de Control" 
      />
      <Breadcumb />      
      <section className="cards-container">
        <CardCategoriesInfo key="locations" title="ubicaciones" 
          itemsQty={locations?.length || 0} 
          iconSrc={`/icons/${locationsIcon.fileName}`} showAddButton={userHasSomePropietaryRole} />
        <CardCategoriesInfo key="users" title="usuarios" 
          itemsQty={users?.length || 0} 
          iconSrc={`/icons/${usersIcon.fileName}`}  showAddButton={userHasSomeAdminRole} />
        <CardCategoriesInfo key="dataloggers" title="dataloggers" 
          itemsQty={dataloggers?.length || 0} 
          iconSrc={`/icons/${dataloggersIcon.fileName}`} showAddButton={userHasSomePropietaryRole} />
      </section>      
    </>
  );
};

export default Dashboard;
