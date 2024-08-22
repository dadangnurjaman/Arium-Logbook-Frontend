import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/ApiService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');  // Default role
  const [assignedApp, setAssignedApp] = useState(''); // State for assigned application
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const registerData = { username, email, password, role };

      // If role is Developer, add assignedApp to registerData
      if (role === 'Developer') {
        registerData.assignedApp = assignedApp;
      }

      const response = await api.post('/auth/register', registerData);

      // Check if the registration was successful
      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="role">Role</label>
          <select 
            id="role" 
            className="w-full border border-gray-300 p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Support">Support</option>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Conditionally render the Assigned Application field if the role is Developer */}
        {role === 'Developer' && (
          <div className="mb-4">
            <label className="block mb-1" htmlFor="assignedApp">Assign Application</label>
            <select 
              id="assignedApp" 
              className="w-full border border-gray-300 p-2 rounded"
              value={assignedApp}
              onChange={(e) => setAssignedApp(e.target.value)}
            >
              <option value="">Select Application</option>
              <option value="Core Banking System">Core Banking System</option>
              <option value="Banking Integration Service">Banking Integration Service</option>
              <option value="Reporting Services">Reporting Services</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
