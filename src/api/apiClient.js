// src/api/apiClient.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const createApiClient = () => {  
  
  let token;
  try {
    const auth = useAuth();
    token = auth?.token;
  } catch (error) {    
    token = null;
  }
  
  return axios.create({
    baseURL: 'http://localhost:5000', // Reemplaza con la URL de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined
    },
  })
};

export default createApiClient;
