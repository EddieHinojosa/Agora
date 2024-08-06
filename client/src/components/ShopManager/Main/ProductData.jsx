import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ProductData = ({ render, productId }) => {
  const [userData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.MODE === 'production' 
            ? import.meta.env.VITE_PROD_API_URL 
            : import.meta.env.VITE_DEV_API_URL}/shopmanager/user/${userId}`);
            setProductData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
        setError('Failed to load user data. Please try again later.');
      }
    };

    fetchProductData();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>The next available agent will be with you shortly...</div>;
  }

  return render(userData);
};

ProductData.propTypes = {
  render: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ProductData;