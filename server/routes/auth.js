import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET, { expiresIn: '1h' });
};

router.post('/firebase-login', async (req, res) => {
    const { token } = req.body;
    console.log("Received token:", token); // Log received token
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded token:", decodedToken); // Log decoded token
        const { uid, email, name } = decodedToken;
        const [firstName, lastName] = name ? name.split(' ') : [null, null];

        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({
                uid,
                email,
                firstName,
                lastName
            });
            await user.save();
        }

        const jwtToken = generateToken(user);
        res.json({ user, token: jwtToken });
    } catch (error) {
        console.error("Error during firebase-login:", error); // Log the error details
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    const { uid, email, username } = req.body;

    try {
        let user = await User.findOne({ uid });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ uid, email, username });
        await user.save();

        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;






















