import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Header.css';
import {ENV} from '../../context/env.js';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>      
      <img src={`${ENV.URL}/images/mdvsrl-logo.jpg`} className='header-img' />
      {user ? (
        <>
        <nav className='navbar'>
          <Link to="/panel" className='header-link'>PANEL DE CONTROL</Link>
          <Link to="/alarmas" className='header-link'>ALARMAS</Link>
          <Link to="/usuario" className='header-link'>{ user }</Link>
        </nav>
        <Link to="#" onClick={logout}  className='navbar-btn  navbar-btn--danger'>
          <img src={`${ENV.URL}/icons/sign-out-alt-solid.svg`} className='navbar-btn-icon' />
          <span className='navbar-btn-text'>SALIR</span>
        </Link>
        </>
        ) : (
        <>
          <nav className='navbar'>
            <Link to="/" className='header-link'>CONTACTO</Link>
            <Link to="/" className='header-link'>SERVICIOS</Link>
            <Link to="/" className='header-link'>PRECIOS</Link>
            <Link to="/" className='header-link'>CONTACTO</Link>
          </nav>
          <Link to="/inicio" className='navbar-btn'>
            <img src={`${ENV.URL}/icons/user-regular.svg`} className='navbar-btn-icon' />
            <span className='navbar-btn-text'>INGRESAR</span>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
