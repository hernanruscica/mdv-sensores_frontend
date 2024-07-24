import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.css";
import { ENV } from "../../context/env.js";
import BtnCallToAction from "../BtnCallToAction/BtnCallToAction.jsx";


const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <img src={`${ENV.URL}/images/mdvsrl-logo.jpg`} className="header-img" />
      {user ? (
        <>
          <nav className="navbar">
            <Link to="/panel" className="header-link">
              PANEL DE CONTROL
            </Link>
            <Link to="/alarmas" className="header-link">
              ALARMAS
            </Link>
            <Link to="/usuario" className="header-link">
              {user}
            </Link>
          </nav>
          <BtnCallToAction
            text="Salir"
            icon="sign-out-alt-solid-white.svg"
            type="danger"
            url="/"
            onClick={logout}
          />
        </>
      ) : (
        <>
          <nav className="navbar">
            <Link to="/" className="header-link">
              CONTACTO
            </Link>
            <Link to="/" className="header-link">
              SERVICIOS
            </Link>
            <Link to="/" className="header-link">
              PRECIOS
            </Link>
            <Link to="/" className="header-link">
              CONTACTO
            </Link>
          </nav>
          <BtnCallToAction
            text="Ingresar"
            icon="user-regular.svg"
            type="normal"
            url="/inicio"
          />
        </>
      )}
    </header>
  );
};

export default Header;
