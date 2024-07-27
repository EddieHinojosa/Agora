import axios from 'axios';

// fetch User from the database
const fetchUser = async (username) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
      params: { username },
    });
    return response.data._id;
  } catch (error) {
    console.error('Error fetching user User:', error);
    return null;
  }
};

export default fetchUser;
