import axios from 'axios';
//import { useAuth } from '../context/AuthContext';
import useEncryptedLocalStorageState from '../hooks/useEncryptedLocalStorageState';

const createApiClient = (contentType) => {  
  const [tokenLS] = useEncryptedLocalStorageState('token', null);
  
    
  let defaultHeaders = null;
  try {
    
    // Definir headers predeterminados 'application/json'
    defaultHeaders = {
      'Content-Type': contentType ? contentType : 'application/json',
      'Authorization': `Bearer ${tokenLS}`
    };
    
  } catch (error) {    
    
    console.log(error)
  }


  

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Reemplaza con la URL de tu API
    headers: defaultHeaders,
  });
};

export default createApiClient;
