import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET, { expiresIn: '1h' });
};

router.post('/firebase-login', async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({
                uid,
                email: decodedToken.email,
                username: '',  // Set default or empty username
                firstName: '',
                lastName: '',
                billingAddress: {},
                mailingAddress: {}
            });
            await user.save();
        }

        const jwtToken = generateToken(user);
        res.json({ user, token: jwtToken });
    } catch (error) {
        console.error('Error during firebase-login:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/set-username-password', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.VITE_JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json({ message: 'Username and password set successfully', user });
    } catch (error) {
        console.error('Error setting username and password:', error);
        res.status(500).json({ message: error.message });
    }
});


router.post('/register', async (req, res) => {
    const { uid, email, username, password } = req.body;

    try {
        let user = await User.findOne({ uid });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        user = new User({ uid, email, username, password: hashedPassword });
        await user.save();

        const jwtToken = generateToken(user);
        res.json({ user, token: jwtToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;






















