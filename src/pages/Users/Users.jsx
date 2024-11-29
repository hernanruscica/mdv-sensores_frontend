import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";

import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
//import "./Users.css";
import EntityTable from "../../components/EntityTable/EntityTable.jsx";



const Users = () => {
  const { user } = useAuth();
  const { users, loadUsers } = useDashboard();

  const columns = [
    { header: 'NOMBRE Y APELLIDO', key: 'usuario_nom_apell', iconName: 'user-regular.svg'},
    { header: 'CORREO ELECTRONICO', key: 'email', iconName: 'envelope-regular.svg' },
    { header: 'UBICACION', key: 'ubicaciones_nombre', iconName: 'building-regular.svg' },
  ];

  return (
    <>
      <Title1 type="usuarios" text="Usuarios" />
      <Breadcumb />
      <ButtonsBar itemsName="usuarios" itemsQty={users?.length || 0}></ButtonsBar>    
      <EntityTable 
        data={users} 
        columns={columns} 
        entityType="usuarios"
      />      
    </>
  );
};

export default Users;
