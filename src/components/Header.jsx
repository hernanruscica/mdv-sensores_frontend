import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>      
      <img src="./images/mdvsrl-logo.jpg" className='header-img' />
      {user ? (
        <>
        <nav className='navbar'>
          <Link to="/dashboard" className='header-link'>PANEL DE CONTROL</Link>
          <Link to="/dashboard" className='header-link'>ALARMAS</Link>
          <Link to="/dashboard" className='header-link'>{ user }</Link>
        </nav>
        <Link to="#" onClick={logout}  className='navbar-btn  navbar-btn--danger'>
          <img src='./icons/sign-out-alt-solid.svg' className='navbar-btn-icon' />
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
          <Link to="/login" className='navbar-btn'>
            <img src='./icons/user-regular.svg' className='navbar-btn-icon' />
            <span className='navbar-btn-text'>INGRESAR</span>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
