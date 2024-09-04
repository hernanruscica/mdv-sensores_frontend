// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';
import { DashboardProvider } from './context/DashboardContext.jsx';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Dataloggers from './pages/Dataloggers/Dataloggers';
import Channels from './pages/Channels/Channels.jsx';
import ViewChannel from './pages/Channels/ViewChannel.jsx';
import ViewUser from './pages/Users/ViewUser';
import Locations from './pages/Locations/Locations';
import ViewLocation from './pages/Locations/ViewLocation';
import ViewDatalogger from './pages/Dataloggers/ViewDatalogger.jsx';
import Alarms from './pages/Alarms/Alarms.jsx';
import ViewAlarm from './pages/Alarms/ViewAlarm.jsx';
import PrivateRoute from './components/PrivateRoute';




const App = () => {
  
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Login />} />
              <Route path="/panel" element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
              <Route path="/panel/usuarios" element={<PrivateRoute ><Users /></PrivateRoute>} />
              <Route path="/panel/usuarios/:id" element={<PrivateRoute ><ViewUser /></PrivateRoute>} />
              <Route path="/panel/ubicaciones" element={<PrivateRoute ><Locations /></PrivateRoute>} />       
              <Route path="/panel/ubicaciones/:id" element={<PrivateRoute ><ViewLocation /></PrivateRoute>} />     
              <Route path="/panel/usuarios/:id" element={<PrivateRoute ><ViewUser /></PrivateRoute>} />    
              <Route path="/panel/dataloggers" element={<PrivateRoute ><Dataloggers /></PrivateRoute>} />          
              <Route path="/panel/dataloggers/:id" element={<PrivateRoute ><ViewDatalogger /></PrivateRoute>} />    
              <Route path="/panel/dataloggers/:id/canales" element={<PrivateRoute ><Channels /></PrivateRoute>} />    
              <Route path="/panel/dataloggers/:id/canales/:channelId" element={<PrivateRoute ><ViewChannel /></PrivateRoute>} /> 
              <Route path="/panel/alarmas" element={<PrivateRoute ><Alarms /></PrivateRoute>} />      
              <Route path="/panel/alarmas/:id" element={<PrivateRoute ><ViewAlarm /></PrivateRoute>} />   
          </Routes>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
};

export default App;