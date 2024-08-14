import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1.jsx";
import Breadcumb from "../../components/Breadcumb/Breadcumb.jsx";
import { Link } from "react-router-dom";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';
//import "./Users.css";

const Users = () => {
  //const { user } = useAuth();

  return (
    <>
      <Title1
        type="usuarios"
        text="Usuarios"        
      />
      <Breadcumb />
      <ButtonsBar itemsName='ubicaciones' />
      <Link to="/panel/usuarios/1">Usuario 1</Link>
      <Link to="/panel/usuarios/2">Usuario 2</Link>
      <Link to="/panel/usuarios/3">Usuario 3</Link>
    </>
  );
};

export default Users;
