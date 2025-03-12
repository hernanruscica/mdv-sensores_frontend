import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title1 } from "../../components/Title1/Title1";
import "./ViewStateAlarm.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import BtnCallToAction from "../../components/BtnCallToAction/BtnCallToAction";
import createApiClient from "../../api/apiClient";
import { getCurrentDateTime } from "../../utils/Dates/Dates";

const ViewStateAlarm = () => {
  const { user } = useAuth();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [decoded, setDecoded] = useState({});
  const navigate = useNavigate();
  const apiClient = createApiClient();

  // Cada vez que cambie el token, se decodifica y se actualiza el estado "decoded"
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    } else {
      console.error("Token no encontrado en la URL.");
    }
  }, [token]);

  // Extraer las variables decodificadas
  const { alarmLogId, userId, alarmId, channelId, dataloggerId } = decoded;

  const setCurrentDateOnAlarmLog = async () => {
    try {
      const formData = new FormData();
      const currentDateAndHour = getCurrentDateTime();
      console.log("Ahora:", currentDateAndHour);
      formData.append("fecha_vista", currentDateAndHour);

      const response = await apiClient.put(`/api/alarmlogs/${alarmLogId}`, formData);

      if (response.status === 200) {
        console.log(`Redirecciona a ver alarma con id: ${alarmId}`);
        console.log(
          `/panel/dataloggers/${dataloggerId}/canales/${channelId}/alarmas/${alarmId}`
        );
        // Si se requiere redirección, se puede descomentar:
        navigate(`/panel/dataloggers/${dataloggerId}/canales/${channelId}/alarmas/${alarmId}`);
      } else {
        console.error("Error actualizando alarma", response);
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  // Ejemplo: Llamamos a la función cuando se tengan los datos y el usuario coincide
  useEffect(() => {
    if (
      alarmLogId &&
      userId &&
      alarmId &&
      channelId &&
      dataloggerId &&
      user !== null &&
      user?.id === userId
    ) {
      console.log(
        `Poniendo como VISTA la alarma id: ${alarmId} del usuario con id: ${userId}`
      );
      console.log(
        `Del log con id: ${alarmLogId} del canal con id: ${channelId} y datalogger con id: ${dataloggerId}`
      );
      setCurrentDateOnAlarmLog();
    }
  }, [alarmLogId, userId, alarmId, channelId, dataloggerId, user]);

  if (loading) {
    return <div>Cargando ...</div>;
  }

  return (
    <main className="page__maincontent">
      <Title1 text="Ver estado de alarma." type="alarmas" />
      {user !== null && user?.id === userId ? (
        <p>
          {`Poniendo como VISTA la alarma id: ${alarmLogId} del usuario con id: ${userId}`}
        </p>
      ) : (
        <>
          <p>
            Para poder ver el estado de la alarma, primero tiene que ingresar con
            el usuario correspondiente al correo que recibió.
          </p>
          <BtnCallToAction
            url="inicio"
            text="Ingresar"
            type="normal"
            icon="user-regular.svg"
          />
        </>
      )}
    </main>
  );
};

export default ViewStateAlarm;
