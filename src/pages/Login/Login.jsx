// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <section className='section'>
      <h1>Login page</h1>
      <p>Welcome to the login Page</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
