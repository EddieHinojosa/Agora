import express from 'express';
import admin from 'firebase-admin';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const router = express.Router();

const authenticate = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

router.post('/firebase-login', async (req, res) => {
    const { token } = req.body;
    try {
        console.log('Received token:', token);

        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        console.log('Decoded token UID:', uid);

        let user = await User.findOne({ uid });
        if (!user) {
            console.log('Creating new user');
            user = new User({
                uid,
                email: decodedToken.email,
                username: decodedToken.email,
                firstName: decodedToken.name?.split(' ')[0] || '',
                lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
                isGmail: true,
                profileCompleted: false
            });

            // Save to MongoDB
            await user.save();
            console.log('User saved to MongoDB:', user);

            // Save to Firestore
            const userDoc = firestore.collection('users').doc(uid);
            await userDoc.set({
                email: decodedToken.email,
                username: decodedToken.email,
                firstName: decodedToken.name?.split(' ')[0] || '',
                lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
                isGmail: true,
                profileCompleted: false
            });
            console.log('User saved to Firestore:', uid);
        } else {
            console.log('User already exists:', user);
        }

        res.json({ user });
    } catch (error) {
        console.error('Error during firebase-login:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/set-username-password', authenticate, async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const user = await User.findOne({ uid: req.user.uid });
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

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export { authenticate };
export default  router;























