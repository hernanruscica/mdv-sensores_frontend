// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'
// import { ENV } from '../../context/env';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate(`/panel`);
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
