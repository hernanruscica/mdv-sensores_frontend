import React, { createContext, useContext } from 'react';
import apiClient from '../api/apiClient';
import useEncryptedLocalStorageState from '../hooks/useEncryptedLocalStorageState';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Usar el hook personalizado para manejar los datos en localStorage
  const [locationsLS, setLocationsLS] = useEncryptedLocalStorageState('locations', null);
  const [dataloggersLS, setDataloggersLS] = useEncryptedLocalStorageState('dataloggers', null);
  const [usersLS, setUsersLS] = useEncryptedLocalStorageState('users', null);
  const [channelsLS, setChannelsLS] = useEncryptedLocalStorageState('channels', null);
  const [alarmsLS, setAlarmsLS] = useEncryptedLocalStorageState('alarms', null);

  // Funciones para cargar datos desde la API y almacenarlos en localStorage
  const loadLocations = async (userId) => {
    try {
      const response = await apiClient.get(`/api/locationsusers/locationsbyuser/${userId}`);
      setLocationsLS(response.data);
    } catch (error) {
      console.error('Failed to load locations:', error);
    }
  };

  const loadDataloggers = async () => {
    try {
      const response = await apiClient.get('/api/dataloggers');
      setDataloggersLS(response.data);
    } catch (error) {
      console.error('Failed to load dataloggers:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await apiClient.get('/api/users');
      setUsersLS(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadChannels = async () => {
    try {
      const response = await apiClient.get('/api/channels');
      setChannelsLS(response.data);
    } catch (error) {
      console.error('Failed to load channels:', error);
    }
  };

  const loadAlarms = async () => {
    try {
      const response = await apiClient.get('/api/alarms');
      setAlarmsLS(response.data);
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  };

  // Función para cargar todos los datos al mismo tiempo si es necesario
  // const loadAllData = async () => {
  //   await Promise.all([loadLocations(), loadDataloggers(), loadUsers(), loadChannels(), loadAlarms()]);
  // };

  return (
    <DashboardContext.Provider
      value={{
        locations: locationsLS,
        dataloggers: dataloggersLS,
        users: usersLS,
        channels: channelsLS,
        alarms: alarmsLS,
        loadLocations,
        loadDataloggers,
        loadUsers,
        loadChannels,
        loadAlarms,
        // loadAllData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook para usar el contexto del Dashboard
export const useDashboard = () => useContext(DashboardContext);
