// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'
import { Title1 } from '../../components/Title1/Title1.jsx';
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
    <main className='page__maincontent'>
      
      <Title1 
        text='Página de ingreso'
        type='edicion'
      />
      <form onSubmit={handleSubmit} className='login__form'>
        <p>🔐 Introduzca sus credenciales para ingresar a la aplicación.</p>      
        <div className='login__form__input-row'>
            <label htmlFor="dni" className='login__form__label'>DNI.:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id='dni'
              placeholder="Ingrese su D.N.I."
              />
        </div>
        <div className='login__form__input-row'>
          <label htmlFor="password" className='login__form__label'>Contraseña.:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id='password'
            placeholder="Ingrese su contraseña"
            />
        </div>
        <p>😕 Se olvidó la contraseña?<br/><Link to='/panel/usuarios/resetear'>Haga CLICK ACÁ para restablecerla</Link></p>
        
        <button className='login__form__btn' type="submit">Ingresar</button>
      </form>
    </main>
  );
};

export default Login;
