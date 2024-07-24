import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/shop.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://*.google.com"],
      connectSrc: ["'self'", "https://accounts.google.com"],
      frameSrc: ["'self'", "https://accounts.google.com"],
    },
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}));

// Initialize Passport and session
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', authRoutes);
app.use('/api/shop', shopRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

