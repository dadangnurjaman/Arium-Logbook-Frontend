import React, { useEffect, useState, useContext } from 'react';
import api from '../services/ApiService';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/dashboards/dashboard-data`);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching data for role ${userRole}:`, error);
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
      fetchData();
    }
  }, [userRole]);

  const renderContent = () => (
    <div>
      <h2>{`${userRole} Dashboard`}</h2>
      <p>{`Here is the content for the ${userRole} role.`}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );

  return (
    <div className="p-4">
      {loading ? <p>Loading...</p> : renderContent()}
    </div>
  );
};

export default Dashboard;
