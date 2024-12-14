import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!user || !token) {
        navigate('/inicio');
        return;
      }

      try {
        // Decodifica el token
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        if (decoded.exp < currentTime) {
          // Si el token expiró, redirigir al login
          navigate('/inicio');
          return;
        }

        // Si todo está bien, deja de cargar
        setLoading(false);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        navigate('/inicio'); // En caso de error con el token, redirige
      }
    };

    checkTokenValidity();
  }, [user, token, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return children;
};

export default PrivateRoute;
