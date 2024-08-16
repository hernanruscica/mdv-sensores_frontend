import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext.jsx";
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction.jsx";
import { Link } from "react-router-dom";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
//import "./Users.css";



const Users = () => {
  const { user } = useAuth();
  const { users, loadUsers } = useDashboard();

  return (
    <>
      <Title1 type="usuarios" text="Usuarios" />
      <Breadcumb />
      <UnderConstruction></UnderConstruction>



      {/* <ButtonsBar itemsName='ubicaciones' />       
      {users.map((user) => (
        <Link to={`/panel/usuarios/${user.id}`} key={`usuario id ${user.id}`}>
          {user.usuario_nom_apell}
        </Link>
      ))}*/}
    </>
  );
};

export default Users;
