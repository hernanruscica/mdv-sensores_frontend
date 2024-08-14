// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (dni, password) => {
     try {
       const response = await apiClient.post('/api/users/login', { dni, password });
       console.log(response.data.user);
       const userNameShow = `${response.data.user.nombre_1} ${response.data.user.apellido_1}`
       setUser(userNameShow);
       setToken(response.data.token);
       
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('user', JSON.stringify(response.data.user));
       return response.data.user;
       
     } catch (error) {
       console.error('Login failed:', error);
     }    
  };

  const logout = () => {
    setUser(null);
    setToken(null)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

   //Recuperar el usuario desde localStorage al cargar la aplicación
    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      if (savedUser && savedToken) {
        const savedUserObject = JSON.parse(savedUser);
        setUser(savedUserObject.nombre_1 + " " + savedUserObject.apellido_1);
        setToken(savedToken);
        console.log("hay user y token en localstorage", user)
      }
    }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
