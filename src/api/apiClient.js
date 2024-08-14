// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Reemplaza con la URL de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
