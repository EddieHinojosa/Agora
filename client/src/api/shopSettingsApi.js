import axios from 'axios';

export const updateUserShopSettings = async (userId, shopDescription, shopShippingAddress) => {
  try {
    const response = await axios.post(`${import.meta.env.MODE === 'production' 
        ? import.meta.env.VITE_PROD_API_URL 
        : import.meta.env.VITE_DEV_API_URL}/api/user/${userId}/settings`, {
      shopDescription,
      shopShippingAddress
    });
    return response.data;
  } catch (error) {
    console.error('Error updating shop settings:', error);
    throw error;
  }
};

export const fetchUserShopSettings = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.MODE === 'production' 
        ? import.meta.env.VITE_PROD_API_URL 
        : import.meta.env.VITE_DEV_API_URL}/api/user/${userId}/settings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shop settings:', error);
    throw error;
  }
};
