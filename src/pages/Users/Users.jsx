import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction.jsx";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
//import "./Users.css";
import UserTable from "../../components/UserTable/UserTable.jsx";



const Users = () => {
  const { user } = useAuth();
  const { users, loadUsers } = useDashboard();

  return (
    <>
      <Title1 type="usuarios" text="Usuarios" />
      <Breadcumb />
      <ButtonsBar itemsName="usuarios" itemsQty={users?.length || 0}></ButtonsBar>    
      <UserTable users={users} />      
    </>
  );
};

export default Users;
