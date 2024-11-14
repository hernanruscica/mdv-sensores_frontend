
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();  

  
  useEffect(() => {
    if (user) {
      navigate('/panel');
    }
  }, [user]);

  return (   
      <>
        <h1>Página de inicio</h1>
        <p>Bienvenidos a MDV Sensores!<br/>
          Para probar la aplicación tiene que ingresar. Click en el botón de arriba, en la cabecera.
        </p>
      </>
      )
      
    }
export default Home;
