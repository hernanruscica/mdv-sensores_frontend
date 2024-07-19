// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
//import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // try {
    //   const response = await apiClient.post('/auth/login', { username, password });
    //   setUser(response.data.user);
    //   localStorage.setItem('token', response.data.token);
    // } catch (error) {
    //   console.error('Login failed:', error);
    // }
    setUser(username);
    localStorage.setItem('token', `${password}123456789`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
