import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, token, fetchUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !user) {
        await fetchUser(storedToken);
      }
      setLoading(false);
    };
    checkAuth();
  }, [user, fetchUser]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;