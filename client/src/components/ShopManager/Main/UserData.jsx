import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UserData = ({ render, userId, isManager }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const baseUrl = import.meta.env.MODE === 'production' 
          ? import.meta.env.VITE_PROD_API_URL 
          : import.meta.env.VITE_DEV_API_URL;

        const endpoint = isManager 
          ? `${baseUrl}/shopmanager/${userId}`
          : `${baseUrl}/shop/${userId}`;

        const response = await axios.get(endpoint);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
      }
    };

    fetchUserData();
  }, [userId, isManager]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>The next available agent will be with you shortly...</div>;
  }

  return render(userData);
};

UserData.propTypes = {
  render: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  isManager: PropTypes.bool.isRequired
};

export default UserData;
