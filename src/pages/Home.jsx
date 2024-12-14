
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from "react-router-dom";
import { Title1 } from '../components/Title1/Title1';
import BtnCallToAction from '../components/BtnCallToAction/BtnCallToAction';

import './Home.css';

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
      <main className="page__maincontent">
        <Title1 text="Bienvenidos a MDV Sensores!." type="inicio" />
                  
          <h3>
            📊 Optimiza el control de tus equipos críticos con nuestro sistema
            de monitoreo 24/7 🌍
          </h3>

          <p className='page__maincontent__p'>
            Nuestro sistema de <strong> administración de dataloggers </strong> está diseñado para
            clínicas, hospitales y cualquier organización que necesite
            supervisar parámetros clave en tiempo real. </p>
          <p className='page__maincontent__p'>
            🕒 <strong>Configura alarmas </strong>
            para recibir notificaciones inmediatas si algo sale de los valores
            normales, genera informes personalizados y accede a <strong> gráficos
            detallados </strong> que te ayudarán a mantener tus equipos electromecánicos
            siempre en óptimas condiciones.
          </p>

          <p className='page__maincontent__p'>
            💡 <strong>Evita fallos</strong>, mejora el rendimiento y asegura la continuidad
            operativa de tus sistemas.
          </p>
          <p className='page__maincontent__p'>
            🔗 Si ya tenés las credenciales, empezá a probar la demo:  
            <BtnCallToAction
              text="Ingresar"
              icon="user-regular.svg"
              type="normal"
              url={`inicio`}                                        
            />
            <br />
            ❓ ¿No tenés credenciales? Contactanos ahora y te ayudaremos a comenzar.
            <BtnCallToAction
              text="Contacto"
              icon="envelope-regular.svg"
              type="normal"
              url={`contacto`}                                        
            />
          </p>
        
      </main>
    </>
  );
      
    }
export default Home;
