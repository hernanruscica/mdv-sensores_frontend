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
  const [userLocationLS, setUserLocationLS] = useEncryptedLocalStorageState('userlocation', null);

  const [dataFromDatalogger, setDataFromDatalogger] = useState([]);
  
  const apiClient = createApiClient();

  // Funciones para cargar datos desde la API y almacenarlos en localStorage
  const loadLocations = async (user) => {
    try {
      if (user.espropietario == 1) {
        // console.log('es propietario')
        const response = await apiClient.get(`/api/locations`);
        setLocationsLS(response.data.locations);
      } else{
        //console.log('NO es propietario')
        const response = await apiClient.get(`/api/locationsusers/locationsbyuser/${user.id}`);
        setLocationsLS(response.data.locationUserData);
      }         
    } catch (error) {
      console.error('Failed to load locations:', error);
    }
  };

  
  const loadDataloggers = async (user) => {
    try {
      if (user.espropietario == 1) {
        const response = await apiClient.get(`/api/dataloggers`);
        setDataloggersLS(response.data.dataloggers);
      }else{
        const response = await apiClient.get(`/api/dataloggers/byuser/${user.id}`);
        setDataloggersLS(response.data.dataloggers);
      }
    } catch (error) {
      console.error('Failed to load dataloggers:', error);
    }
  };

  const loadUsers = async (userId) => {
    try {
      const response = await apiClient.get(`/api/users/byuser/${userId}`);
      //console.log(response.data.users);
      setUsersLS(response.data.users.filter(user => user.usuarios_roles_id <= userLocationLS[0].usuarios_roles_id));
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

  const rolesLS = [
    {id: 7,
    nombre: "operario",
    descripcion: "Operario de una ubicación, puede ver los dataloggers y canales de dicha ubicación.",
    accion_id: 1},
    {id: 8,
    nombre: "administrador",
    descripcion: "Administrador de una ubicación, puede crear, eliminar usuarios, asignar y desasignar alarmas.",
    accion_id: 3},
    {id: 9,
    nombre: "propietario",
    descripcion: "Usuario con todos los permisos sobre todas las ubicaciones y usuarios.",
    accion_id: 3},
    ]

  const loadUserLocation = async (id) => {
    try {
      //console.log('loadUserLocation') 
      const response2 = await apiClient.get(`/api/locationsusers/locationsbyuser/${id}`);
      // console.log(response2.data.locationUserData)
      setUserLocationLS(response2.data.locationUserData)
    } catch (error) {
      console.error('Failed to load userLocations:', error);
    }
  }

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
     await Promise.all([loadLocations(user), loadDataloggers(user), loadUsers(userId), loadChannels(userId), loadAlarms(userId), loadAlarmsLocation(locationId), loadUserLocation(userId)]);     
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
        roles: rolesLS,
        userLocation: userLocationLS,
        dataFromDatalogger,
        loadLocations,
        loadDataloggers,
        loadUsers,
        loadChannels,
        loadAlarms,
        loadAlarmsLocation,
        loadDataFromDatalogger,
        loadUserLocation,
        loadAllData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook para usar el contexto del Dashboard
export const useDashboard = () => useContext(DashboardContext);
