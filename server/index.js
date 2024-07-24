import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './config/passport.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
    origin: '*', // Update this to match your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

import authRoutes from './routes/auth.js';
app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

