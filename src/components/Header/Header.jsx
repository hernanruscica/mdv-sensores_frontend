import {useState} from "react";
import { Link ,useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.css";
import { ENV } from "../../context/env.js";
import BtnCallToAction from "../BtnCallToAction/BtnCallToAction.jsx";


const Header = () => {
  const { user, logout } = useAuth();
  const [navbarVisible, setNavbarVisible] = useState(false);  
  const location = useLocation();  

  const menuBtnHandler = () => {    
    setNavbarVisible(!navbarVisible);
    
  }
  const handlerLogOut = (e) => {
    e.preventDefault();
    logout();
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
            <Link to={`${ENV.URL}/panel`} className={`header-link ${(location.pathname == '/panel') ? 'header-link-selected' : ''}`} id='panel'  onClick={menuBtnHandler}>
              PANEL DE CONTROL
            </Link>
            <Link to={`${ENV.URL}/panel/usuarios/${user.id}/alarmas`} className={`header-link ${(location.pathname.split('/')[location.pathname.split('/').length-1] == 'alarmas') ? 'header-link-selected' : ''}`} id='alarmas'  onClick={menuBtnHandler}>
              ALARMAS
            </Link>
            <Link to={`${ENV.URL}/panel/usuarios/${user.id}`} className={`header-link ${(location.pathname.split('/')[location.pathname.split('/').length-2] == 'usuarios') ? 'header-link-selected' : ''}`} id='usuarios'  onClick={menuBtnHandler}>
              {`${user.nombre_1} ${user.apellido_1}`}
            </Link>
            <BtnCallToAction
              text="Salir"
              icon="sign-out-alt-solid-white.svg"
              type="danger"
              url='/'
              onClick={handlerLogOut}
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
          <nav className={`navbar ${(navbarVisible) ? 'navbar-show' : ''}`}>
            <button className="header-btn-icon" onClick={menuBtnHandler}>
              <img
                src={`${ENV.URL}/icons/times-solid.svg`}
                className="header-icon close-menu-btn"
              />
            </button>
            <Link to="/" className={`header-link ${(location.pathname == '/') ? 'header-link-selected' : ''}` } id='inicio' onClick={menuBtnHandler} >
              INICIO
            </Link>            
            <Link to="/contacto" className={`header-link ${(location.pathname == '/contacto') ? 'header-link-selected' : ''}`} id='contacto' onClick={menuBtnHandler}>
              CONTACTO
            </Link>
            <BtnCallToAction
            text="Ingresar"
            icon="user-regular.svg"
            type="normal"
            url={`inicio`}
            onClick={menuBtnHandler}
          />
          </nav>
          <button className="header-btn-icon" onClick={menuBtnHandler}>
            <img
              src={`${ENV.URL}/icons/bars-solid.svg`}
              className="header-icon"
            />
          </button>          
          
        </>
      )}
    </header>
  );
};

export default Header;
