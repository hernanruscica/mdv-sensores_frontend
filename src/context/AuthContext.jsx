// src/context/AuthContext.js
import React, { createContext, useContext } from 'react';
import apiClient from '../api/apiClient';
import useEncryptedLocalStorageState from '../hooks/useEncryptedLocalStorageState';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Usar el hook personalizado para manejar user y token en localStorage
  const [userLS, setUserLS] = useEncryptedLocalStorageState('user', null);
  const [tokenLS, setTokenLS] = useEncryptedLocalStorageState('token', null);

  // Manejar login
  const login = async (dni, password) => {
    try {
      const response = await apiClient.post('/api/users/login', { dni, password });     

      setUserLS({ ...response.data.user});
      setTokenLS(response.data.token);

      return response.data.user;
    } catch (error) {
      console.error('Login failed:', error);
      //throw error; // Lanzar el error para manejarlo en la UI si es necesario
      return null;
    }
  };

  // Manejar logout
  const logout = () => {
    setUserLS(null);
    setTokenLS(null);
  };

  return (
    <AuthContext.Provider value={{ user: userLS, token: tokenLS, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
