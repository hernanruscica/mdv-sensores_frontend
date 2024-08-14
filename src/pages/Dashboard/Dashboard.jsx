// src/pages/Dashboard.js
import React from "react";
import { useAuth } from '../../context/AuthContext.jsx';
import { Title1 } from "../../components/Title1/Title1";

import Breadcumb from "../../components/Breadcumb/Breadcumb";
import "./Dashboard.css";

import CardCategoriesInfo from "../../components/CardCategoriesInfo/CardCategoriesInfo";


const Dashboard = () => {
  const { user, token } = useAuth();
  console.log(user, token);

  return (
    <>
      <Title1 
        type="panel"
        text="Panel de Control" 
      />
      <Breadcumb />
      
      {/* <Link to="/panel/dataloggers/1/canales/1">Ver canal</Link> */}

      <section className="cards-container">
        <CardCategoriesInfo key="locations" title="ubicaciones"  itemsQty='3'/>
        <CardCategoriesInfo key="users" title="usuarios" itemsQty='4'/>
        <CardCategoriesInfo key="dataloggers" title="dataloggers"  itemsQty='2'/>
      </section>      
    </>
  );
};

export default Dashboard;
