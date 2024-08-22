import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import { NavigationProvider } from './context/NavigationContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavigationProvider>
          <Routes>
            <Route
              path="/"
              element={<AuthWrapper />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <NotificationProvider>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </NotificationProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationProvider>
                    <Layout>
                      <Notifications />
                    </Layout>
                  </NotificationProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </NavigationProvider>
      </Router>
    </AuthProvider>
  );
};

const AuthWrapper = () => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Tampilkan loading saat data sedang diambil
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;
