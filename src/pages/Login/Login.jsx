// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css'
// import { ENV } from '../../context/env';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userLogged = await login(username, password);    
    if  (userLogged) {
      navigate(`/panel`);
    }else{
      alert('Usuario y/o contraseña incorrectos!')
      navigate(`/inicio`);
    }
  };

  return (
    <section className='login-container'>
      <h1>Página de ingreso</h1>
      <form onSubmit={handleSubmit} className='login-form'>
      <p>Introduzca sus credenciales para ingresar a la aplicación.</p>
      <p>Por el periodo de pruebas, puede ingresar <strong>Cualquier dni y cualquier contraseña</strong></p>
      <p>la seccion que tiene mas detalles por ahora es <strong>dataloggers</strong></p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su D.N.I."
          />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Inregese su contraseña"
          />
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
};

export default Login;
