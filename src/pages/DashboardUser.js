import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/ApiService';

const DashboardUser = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/user-reports');
        setReports(response.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <DashboardLayout>
      <h2>User Dashboard</h2>
      <div className="mt-4">
        <h3>Your Reports</h3>
        {/* Render reports */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
