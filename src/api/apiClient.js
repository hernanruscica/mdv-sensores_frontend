// src/api/apiClient.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const createApiClient = () => {
  const { token } = useAuth();
  return axios.create({
    baseURL: 'http://localhost:5000', // Reemplaza con la URL de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined
    },
  })
};

export default createApiClient;
