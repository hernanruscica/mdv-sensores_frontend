import React, { createContext, useContext, useState } from 'react';
import createApiClient from '../api/apiClient';
import useEncryptedLocalStorageState from '../hooks/useEncryptedLocalStorageState';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Usar el hook personalizado para manejar los datos en localStorage
  const [locationsLS, setLocationsLS] = useEncryptedLocalStorageState('locations', null);
  const [dataloggersLS, setDataloggersLS] = useEncryptedLocalStorageState('dataloggers', null);
  const [usersLS, setUsersLS] = useEncryptedLocalStorageState('users', null);
  const [channelsLS, setChannelsLS] = useEncryptedLocalStorageState('channels', null);
  const [alarmsLS, setAlarmsLS] = useEncryptedLocalStorageState('alarms', null);
  const [alarmsLocationLS, setAlarmsLocationLS] = useEncryptedLocalStorageState('alarmsLocation', null);

  const [dataFromDatalogger, setDataFromDatalogger] = useState([]);
  
  const apiClient = createApiClient();

  // Funciones para cargar datos desde la API y almacenarlos en localStorage
  const loadLocations = async (userId) => {
    try {
      const response = await apiClient.get(`/api/locationsusers/locationsbyuser/${userId}`);
      setLocationsLS(response.data.locationUserData);
    } catch (error) {
      console.error('Failed to load locations:', error);
    }
  };

  
  const loadDataloggers = async (userId) => {
    try {
      const response = await apiClient.get(`/api/dataloggers/byuser/${userId}`);
      setDataloggersLS(response.data.dataloggers);
    } catch (error) {
      console.error('Failed to load dataloggers:', error);
    }
  };

  const loadUsers = async (userId) => {
    try {
      const response = await apiClient.get(`/api/users/byuser/${userId}`);
      //console.log(response.data.users);
      setUsersLS(response.data.users);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadChannels = async (userId) => {
    try {
      const response = await apiClient.get(`/api/channels/byuser/${userId}`);
      setChannelsLS(response.data.channels);
    } catch (error) {
      console.error('Failed to load channels:', error);
    }
  };

  const loadAlarms = async (userId) => {
    try {
      const response = await apiClient.get(`/api/alarmusers/alarmsbyuser/${userId}`);
      setAlarmsLS(response.data.alarms);
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  };
  //setAlarmsLocationLS   ///api/alarms/bylocation/34
  const loadAlarmsLocation = async (locationId) => {
    try {      
      const response = await apiClient.get(`/api/alarms/bylocation/${locationId}`);
      const responseAlarms = response.data.alarms?.filter(alarm => alarm.estado == 1) || []; 
      setAlarmsLocationLS(responseAlarms);      
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  };

  //const [dataFromDatalogger, setDataFromDatalogger] = useState([]);
  const loadDataFromDatalogger = async (table, periodMinutes) => {
    try {
      const response = await apiClient.get(`/api/data/${table}/${periodMinutes}`);
      //console.log(response.data.data);
      setDataFromDatalogger(response.data.data);
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  }

  // Función para cargar todos los datos al mismo tiempo si es necesario
   const loadAllData = async (userId, locationId) => {
     await Promise.all([loadLocations(userId), loadDataloggers(userId), loadUsers(userId), loadChannels(userId), loadAlarms(userId), loadAlarmsLocation(locationId)]);     
   };

  return (
    <DashboardContext.Provider
      value={{
        locations: locationsLS,
        dataloggers: dataloggersLS,
        users: usersLS,
        channels: channelsLS,
        alarms: alarmsLS,
        alarmsLocation: alarmsLocationLS, 
        dataFromDatalogger,
        loadLocations,
        loadDataloggers,
        loadUsers,
        loadChannels,
        loadAlarms,
        loadAlarmsLocation,
        loadDataFromDatalogger,
        loadAllData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook para usar el contexto del Dashboard
export const useDashboard = () => useContext(DashboardContext);
