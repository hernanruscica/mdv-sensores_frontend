import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const createApiClient = (contentType) => {  
  
  const  token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTcyOTcyNTczOSwiZXhwIjoxNzMyMzE3NzM5fQ.flpmJaBQVhFwuLN-GaE9pZL8uu6OdR70Rh5Oz3xlp9Y'  
  
  let defaultHeaders = null;
  try {
    
    // Definir headers predeterminados 'application/json'
    defaultHeaders = {
      'Content-Type': contentType ? contentType : 'application/json',
      'Authorization': `Bearer ${token}`
    };
    console.log(defaultHeaders)
  } catch (error) {    
    token = null;
    console.log(error)
  }


  

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Reemplaza con la URL de tu API
    headers: defaultHeaders,
  });
};

export default createApiClient;
