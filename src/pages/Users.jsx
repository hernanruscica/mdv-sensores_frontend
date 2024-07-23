import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../components/Title1/Title1";
import Breadcumb from "../components/Breadcumb/Breadcumb";
import { Link } from "react-router-dom";
//import "./Users.css";

const Users = () => {
  //const { user } = useAuth();

  return (
    <>
      <Title1
        text="usuarios"
      />
      <Breadcumb />
      <Link to="/panel/usuarios/1">Usuario 1</Link>
    </>
  );
};

export default Users;
