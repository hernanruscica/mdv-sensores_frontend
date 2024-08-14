import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null ) {
      
      navigate('/inicio');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
        <>
            <div>Cargando...</div>; 
        </>
    )
  }

  return children;
};

export default PrivateRoute;

