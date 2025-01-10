import React, { useEffect, useState } from "react";
import { Title1 } from "../../components/Title1/Title1";
import { useParams } from "react-router-dom";
import createApiClient from '../../api/apiClient.js' ;
import ResetPassword from "../../components/forms/ResetPassword.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
const ActivateUser = () => {

  const { token } = useParams(); 
  const [ currentUser, setCurrentUser] = useState({id: '', dni: '', userName: ''});    
  const [ loading, setLoading] = useState(false);
  const apiClient = createApiClient();   
  const { addTokenLS } = useAuth();
  

  const loadCurrentUserData = async (token) => {
    try{
      setLoading(true);
      const response = await apiClient.get(`/api/users/activate/${token}`);
      if (response.status != 201){
        throw new Error(response.message);         
      }
      
      //If the token is valid ...
      await addTokenLS(token);
      const {userId, dni, userName } = response.data;
      setCurrentUser({userName: userName, dni: dni, userId: userId});      
      
    }catch(error){
      console.log(`failed to load current user data`, error);
    }finally{
      setLoading(false);
    }
  }
  
  useEffect(() => {   
    loadCurrentUserData(token);
  }, []);     

  if (loading ) {   
    
    return <div>Cargando...</div>;
  }  
  
  return (
    <main className='page__maincontent'>
      <Title1     
        type="usuarios"   
        text={`Reseteo de contraseña`}
      />
      <p className="page__maincontent__p">{`Reseteo de contraseña para ${currentUser?.userName || ''} con D.N.I.: ${currentUser?.dni}`}</p>
       <ResetPassword userId={currentUser.userId}/>       
      
    </main>
  );
};

export default ActivateUser;
