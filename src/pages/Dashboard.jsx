// src/pages/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return <div>Welcome, {user}</div>;
};

export default Dashboard;
