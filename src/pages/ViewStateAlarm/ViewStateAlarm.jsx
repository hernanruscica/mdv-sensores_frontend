import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title1 } from "../../components/Title1/Title1";
import "./ViewStateAlarm.css";
import { jwtDecode } from "jwt-decode";
import { ENV } from "../../context/env";
import { useAuth } from "../../context/AuthContext";
import BtnCallToAction from "../../components/BtnCallToAction/BtnCallToAction";
import createApiClient from "../../api/apiClient";
import { getCurrentDateTime } from "../../utils/Dates/Dates";

const ViewStateAlarm = () => {
  
  const { user } = useAuth();   
  const {token} = useParams();    
  const [loading, setLoading] = useState(false);
  const apiClient = createApiClient(); 
  const [decoded, setDecoded] = useState({});
  const navigate = useNavigate();

  const setCurrentDateOnAlarmLog = async () => {
    const formData = new FormData();
    const currentDateAndHour = getCurrentDateTime();
    console.log('Ahora', currentDateAndHour)
    formData.append("fecha_vista", currentDateAndHour);
    const response =  await apiClient.put(`/api/alarmlogs/${decoded.alarmLogId}`, formData);   
    if (response.status == 200){
      console.log(`Redirecciona a ver alarma con id: ${decoded.alarmId}`)      
      navigate(`/panel/dataloggers/${decoded.dataloggerId}/canales/${decoded.channelId}/alarmas/${decoded.alarmId}`);
    }else{
      console.log('error actualizando alarma', alarmUpdated);
    }               
  }  

  useEffect(() => {
    try {
      setLoading(true);
      setDecoded(jwtDecode(token, ENV.JWT_SECRET));          

      if (decoded.alarmLogId && decoded.userId && decoded.alarmId && decoded.channelId && decoded.dataloggerId
          && user !== null && user?.id == decoded.userId){
        console.log(`Poniendo como VISTA la alarma id: ${decoded.alarmId} del usuario con id: ${decoded.userId}`);
        console.log(`Del log con id: ${decoded.alarmLogId} del canal con id: ${decoded.channelId} y datalogger con id: ${decoded.dataloggerId}`);
        //console.log(user);
                    
        setCurrentDateOnAlarmLog(decoded.alarmLogId, decoded.alarmId);   
      }
    } catch (error) {        
      console.log(error)
    }finally{
      setLoading(false);
    }    

  }, []); 

  if (loading) {
    return(
      <div>Cargando ...</div>
    )
  }


  return (
    <>
      <main className="page__maincontent">       
        <Title1 text="Ver estado de alarma." type="alarmas" />
        {(user !== null && user?.id == decoded.userId ) 
        ? <p>{`Poniendo como VISTA la alarma id: ${decoded.alarmLogId} del usuario con id: ${decoded.userId}`}</p>       
        : <>
            <p>Para poder ver el estado de la alarma, primero tiene que ingresar con el usuario correspondiente al correo que recibió.</p>
            <BtnCallToAction url='inicio' text='Ingresar' type='normal' icon='user-regular.svg' />
          </>
        }
      </main>
    </>
  );
};

export default ViewStateAlarm;
