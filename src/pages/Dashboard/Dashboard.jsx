// src/pages/Dashboard.js
import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";

import Breadcumb from "../../components/Breadcumb/Breadcumb";
import "./Dashboard.css";

import CardCategoriesInfo from "../../components/CardCategoriesInfo/CardCategoriesInfo";


const Dashboard = () => {
  //const { user } = useAuth();

  return (
    <>
      <Title1 text="panel" />
      <Breadcumb />
      
      {/* <Link to="/panel/dataloggers/1/canales/1">Ver canal</Link> */}

      <section className="cards-container">
        <CardCategoriesInfo title="ubicaciones"  itemsQty='3'/>
        <CardCategoriesInfo title="usuarios" itemsQty='4'/>
        <CardCategoriesInfo title="dataloggers"  itemsQty='2'/>
      </section>      
    </>
  );
};

export default Dashboard;
