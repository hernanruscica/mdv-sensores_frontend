// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users';
import Dataloggers from './pages/Dataloggers/Dataloggers';
import Channels from './pages/Channels';
import ViewUser from './pages/ViewUser';
import Locations from './pages/Locations';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Login />} />
          <Route path="/panel" element={<Dashboard />} />
          <Route path="/panel/usuarios" element={<Users />} />
          <Route path="/panel/dataloggers" element={<Dataloggers />} />          
          <Route path="/panel/ubicaciones" element={<Locations />} />       
          <Route path="/panel/usuarios/:id" element={<ViewUser />} />    
          <Route path="/panel/dataloggers/:id/canales/:id" element={<Channels />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
