import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/shop.js';

// const {google} = require('googleapis');
// const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.SECRET)

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend URL
    credentials: true
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
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri)
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
app.use('/api', authRoutes); // Ensure this line is present and correct
app.use('/api/shop', shopRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






