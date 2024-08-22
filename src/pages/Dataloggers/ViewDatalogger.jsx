import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import createApiClient from "../../api/apiClient";
import { Title1 } from "../../components/Title1/Title1";
import { Title2 } from "../../components/Title2/Title2";
import Breadcumb from "../../components/Breadcumb/Breadcumb";
import CardDataloggerDetails from "../../components/CardDataloggerDetails/CardDataloggerDetails";
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar.jsx';

const ViewDatalogger = () => {
  const apiClient = createApiClient();
  const { id } = useParams();
  const { user } = useAuth();
  const { channels, alarms, loadChannels, loadAlarms } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [currentDatalogger, setCurrentDatalogger] = useState(null);
  const [channelsByCurrentDatalogger, setChannelsByCurrentDatalogger] = useState([]);
  const [alarmssByCurrentDatalogger, setAlarmsByCurrentDatalogger] = useState([]);

  const loadCurrentDataloggerInfo = async (dataloggerId) => {
    try {
      const response = await apiClient.get(`/api/dataloggers/${dataloggerId}`);
      setCurrentDatalogger(response.data.datalogger);
    } catch (error) {
      console.error("Error loading datalogger info:", error);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        loadCurrentDataloggerInfo(id),
        loadChannels(user.id),
        loadAlarms(user.id)
      ]);
      setLoading(false);
    }
    loadData();
  }, [id, user.id]);

  useEffect(() => {
    if (currentDatalogger && channels.length > 0) {
      setChannelsByCurrentDatalogger(
        channels.filter(channel => channel.datalogger_id == currentDatalogger.id)
      );
      setAlarmsByCurrentDatalogger(
        alarms.filter(alarm => alarm.datalogger_id == currentDatalogger.id)
      );
    }
  }, [currentDatalogger, channels]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Title1
        type="dataloggers"
        text={`Datalogger: "${currentDatalogger?.nombre || ''}"`}
      />
      <Breadcumb />
      <CardDataloggerDetails
        datalogger={currentDatalogger}
        channels={channelsByCurrentDatalogger}
        alarms={alarmssByCurrentDatalogger}
      />
      <Title2
        type="canales"
        text={`Canales de "${currentDatalogger?.nombre || ''}"`}
      />
      <ButtonsBar
        itemsName="canales"
        itemsQty={channelsByCurrentDatalogger.length}
      />
      <Title2
        type="alarmas"
        text={`Alarmas programadas en "${currentDatalogger?.nombre || ''}"`}
      />
    </>
  );
};

export default ViewDatalogger;