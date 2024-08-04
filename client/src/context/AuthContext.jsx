import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;
  const navigate = useNavigate();

  const fetchUser = useCallback(async (token) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${apiUrl}/api/auth/me`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    }
  }, [apiUrl]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, [fetchUser]);

  const regularLogin = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      fetchUser(token);
      navigate('/');  // Navigate to home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      throw new Error('Login failed. Please check your email and password.');
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const getUserByUsername = async (username) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/username/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, regularLogin, logout, getUserByUsername, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };


































