// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/ApiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated && !userRole) {
        try {
          const response = await api.get('/auth/user-role');
          setUserRole(response.data.role);
          localStorage.setItem('userRole', response.data.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [isAuthenticated, userRole]);

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, setIsAuthenticated, setUserRole, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
