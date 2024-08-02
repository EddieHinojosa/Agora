import React, { createContext, useState } from 'react';
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

  const regularLogin = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      
      // Decode token to get user information (Assuming the token contains user info)
      const user = JSON.parse(atob(token.split('.')[1])).userId; // Adjust this line based on your token structure
      setUser({ id: user });
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

  return (
    <AuthContext.Provider value={{ user, regularLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };


































