import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/ApiService';

const DashboardDeveloper = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await api.get('/incidents?assignedTo=me');
        setIncidents(response.data);
      } catch (err) {
        console.error('Error fetching incidents:', err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <DashboardLayout>
      <h2>Developer Dashboard</h2>
      <div className="mt-4">
        <h3>Assigned Incidents</h3>
        {/* Render incidents */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardDeveloper;
