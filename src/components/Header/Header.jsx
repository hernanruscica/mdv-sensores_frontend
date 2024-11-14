import {useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.css";
import { ENV } from "../../context/env.js";
import BtnCallToAction from "../BtnCallToAction/BtnCallToAction.jsx";


const Header = () => {
  const { user, logout } = useAuth();
  const [navbarVisible, setNavbarVisible] = useState(false);

  const menuBtnHandler = () => {
    setNavbarVisible(!navbarVisible);
  }
 //console.log(navbarVisible);
  return (
    <header>
      <img src={`${ENV.URL}/images/mdvsrl-logo.jpg`} className="header-img" />
      {user ? (
        <>
          <nav className={`navbar ${(navbarVisible) ? 'navbar-show' : ''}`}>
            <button className="header-btn-icon" onClick={menuBtnHandler}>
              <img
                src={`${ENV.URL}/icons/times-solid.svg`}
                className="header-icon close-menu-btn"
              />
            </button>
            <Link to={`${ENV.URL}/panel`} className="header-link"  onClick={menuBtnHandler}>
              PANEL DE CONTROL
            </Link>
            <Link to={`${ENV.URL}/panel/alarmas`} className="header-link"  onClick={menuBtnHandler}>
              ALARMAS
            </Link>
            <Link to={`${ENV.URL}/panel/usuarios/${user.id}`} className="header-link"  onClick={menuBtnHandler}>
              {`${user.nombre_1} ${user.apellido_1}`}
            </Link>
            <BtnCallToAction
              text="Salir"
              icon="sign-out-alt-solid-white.svg"
              type="danger"
              url=''
              onClick={logout}
            />
          </nav>
          <button className="header-btn-icon" onClick={menuBtnHandler}>
            <img
              src={`${ENV.URL}/icons/bars-solid.svg`}
              className="header-icon"
            />
          </button>
        </>
      ) : (
        <>
          <nav className="navbar">
            <Link to="/" className="header-link" onClick={menuBtnHandler}>
              CONTACTO
            </Link>
            <Link to="/" className="header-link" onClick={menuBtnHandler}>
              SERVICIOS
            </Link>
            <Link to="/" className="header-link" onClick={menuBtnHandler}>
              PRECIOS
            </Link>
            <Link to="/" className="header-link" onClick={menuBtnHandler}>
              CONTACTO
            </Link>
          </nav>
          <BtnCallToAction
            text="Ingresar"
            icon="user-regular.svg"
            type="normal"
            url={`inicio`}
          />
        </>
      )}
    </header>
  );
};

export default Header;
