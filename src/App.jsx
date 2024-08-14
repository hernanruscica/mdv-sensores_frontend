// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Dataloggers from './pages/Dataloggers/Dataloggers';
import Channels from './pages/Channels';
import ViewUser from './pages/Users/ViewUser';
import Locations from './pages/Locations/Locations';
import ViewLocation from './pages/Locations/ViewLocation';
import PrivateRoute from './components/PrivateRoute';




const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Login />} />

          <Route path="/panel" element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
          <Route path="/panel/usuarios" element={<PrivateRoute ><Users /></PrivateRoute>} />
          <Route path="/panel/dataloggers" element={<PrivateRoute ><Dataloggers /></PrivateRoute>} />          
          <Route path="/panel/ubicaciones" element={<PrivateRoute ><Locations /></PrivateRoute>} />       
          <Route path="/panel/ubicaciones/:id" element={<PrivateRoute ><ViewLocation /></PrivateRoute>} />     
          <Route path="/panel/usuarios/:id" element={<PrivateRoute ><ViewUser /></PrivateRoute>} />    
          <Route path="/panel/dataloggers/:id/canales/:id" element={<PrivateRoute ><Channels /></PrivateRoute>} /> 
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
