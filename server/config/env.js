import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const mongoUri = process.env.VITE_MONGO_URI;
export const sessionSecret = process.env.VITE_SESSION_SECRET;
export const allowedOrigins = [
  process.env.VITE_DEV_API_URL,
  process.env.VITE_DEV_APP_URL,
  process.env.VITE_PROD_API_URL,
  process.env.VITE_PROD_APP_URL,
];

