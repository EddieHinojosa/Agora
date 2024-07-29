import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// console.log(cloudinary.config().CLOUD_URL);

cloudinary.config({
    cloud_name: process.env.VITE_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary;