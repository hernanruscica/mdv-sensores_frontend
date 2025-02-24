// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';
import { DashboardProvider } from './context/DashboardContext.jsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Dataloggers from './pages/Dataloggers/Dataloggers';
import Channels from './pages/Channels/Channels.jsx';
import ViewChannel from './pages/Channels/ViewChannel.jsx';
import ViewUser from './pages/Users/ViewUser';
import ActivateUser from './pages/Users/ActivateUser';
import Locations from './pages/Locations/Locations';
import ViewLocation from './pages/Locations/ViewLocation';
import ViewDatalogger from './pages/Dataloggers/ViewDatalogger.jsx';
import Alarms from './pages/Alarms/Alarms.jsx';
import ViewAlarm from './pages/Alarms/ViewAlarm.jsx';
import PrivateRoute from './components/PrivateRoute';
import {ENV} from './context/env.js';
import EditPage from './pages/EditPage/EditPage.jsx';
import { UnderConstruction } from './pages/UnderConstruction/UnderContruction.jsx';
import  CreatePage  from './pages/CreatePage/CreatePage.jsx';
import SendActivationEmail from './pages/Users/SendActivationEmail.jsx';
import ViewStateAlarm from './pages/ViewStateAlarm/ViewStateAlarm.jsx';

import Modal from 'react-modal';     
Modal.setAppElement('#root'); 

const App = () => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router basename={ENV.VITE_APP_URL}>
          <Header />          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Login />} />
            <Route path="/contacto" element={<Contact />} />
              <Route path="/panel" element={<PrivateRoute ><Dashboard /></PrivateRoute>} />

              <Route path="/panel/usuarios" element={<PrivateRoute ><Users /></PrivateRoute>} />
              <Route path="/panel/usuarios/:id" element={<PrivateRoute ><ViewUser /></PrivateRoute>} />
              <Route path="/panel/usuarios/agregar" element={<PrivateRoute ><CreatePage /></PrivateRoute>} />
              <Route path="/panel/usuarios/activar/:token" element={<ActivateUser />}/>
              <Route path="/panel/usuarios/resetear" element={<SendActivationEmail />}/>
              <Route path="/panel/usuarios/:id/edicion" element={<PrivateRoute ><EditPage /></PrivateRoute>} />

              <Route path="/panel/ubicaciones" element={<PrivateRoute ><Locations /></PrivateRoute>} />       
              <Route path="/panel/ubicaciones/:id" element={<PrivateRoute ><ViewLocation /></PrivateRoute>} />     
              <Route path="/panel/ubicaciones/agregar" element={<PrivateRoute ><CreatePage /></PrivateRoute>} />                  
              <Route path="/panel/ubicaciones/:id/edicion" element={<PrivateRoute ><EditPage /></PrivateRoute>} />

              <Route path="/panel/dataloggers" element={<PrivateRoute ><Dataloggers /></PrivateRoute>} />          
              <Route path="/panel/dataloggers/:id" element={<PrivateRoute ><ViewDatalogger /></PrivateRoute>} />   
              <Route path="/panel/dataloggers/agregar" element={<PrivateRoute ><CreatePage /></PrivateRoute>} />
              <Route path="/panel/dataloggers/:id/edicion" element={<PrivateRoute ><EditPage /></PrivateRoute>} />              

              <Route path="/panel/dataloggers/:id/canales" element={<PrivateRoute ><Channels /></PrivateRoute>} />    
              <Route path="/panel/dataloggers/:id/canales/:channelId" element={<PrivateRoute ><ViewChannel /></PrivateRoute>} /> 
              <Route path="/panel/dataloggers/:id/canales/agregar" element={<PrivateRoute ><UnderConstruction /></PrivateRoute>} />
              <Route path="/panel/dataloggers/:id/canales/:channelId/edicion" element={<PrivateRoute ><EditPage /></PrivateRoute>} /> 

              <Route path="/panel/dataloggers/:dataloggerId/alarmas" element={<PrivateRoute ><Alarms /></PrivateRoute>} />   
              <Route path="/panel/dataloggers/:dataloggerId/canales/:channelId/alarmas" element={<PrivateRoute ><Alarms /></PrivateRoute>} />    
              <Route path="/panel/ubicaciones/:locationId/alarmas" element={<PrivateRoute ><Alarms /></PrivateRoute>} />   
              <Route path="/panel/usuarios/:userId/alarmas" element={<PrivateRoute ><Alarms /></PrivateRoute>} />     
              <Route path="/panel/verestadoalarma/:token" element={<ViewStateAlarm />} />                   

              <Route path="/panel/dataloggers/:id/canales/:channelId/alarmas/:alarmId" element={<PrivateRoute ><ViewAlarm /></PrivateRoute>} />   
              <Route path="/panel/dataloggers/:id/canales/:channelId/alarmas/:alarmId/edicion" element={<PrivateRoute ><EditPage /></PrivateRoute>} />   
              
          </Routes>
               
          <Footer />
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
};

export default App;
