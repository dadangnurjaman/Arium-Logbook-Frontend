import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/ApiService';

const DashboardAdmin = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get('/server-metrics');
        setMetrics(response.data);
      } catch (err) {
        console.error('Error fetching server metrics:', err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <DashboardLayout>
      <h2>Admin Dashboard</h2>
      <div className="mt-4">
        <h3>Server Metrics</h3>
        {/* Render metrics */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
