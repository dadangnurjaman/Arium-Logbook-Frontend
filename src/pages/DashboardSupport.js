import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/ApiService';

const DashboardSupport = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await api.get('/incidents');
        setIncidents(response.data);
      } catch (err) {
        console.error('Error fetching incidents:', err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <DashboardLayout>
      <h2>Support Dashboard</h2>
      <div className="mt-4">
        <h3>Incident List</h3>
        {/* Render incidents */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardSupport;
