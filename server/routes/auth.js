import dotenv from 'dotenv';
import express from 'express';
import admin from 'firebase-admin';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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
            const firestore = admin.firestore();
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
    const {
        uid,
        email,
        username,
        password, // Ensure password is included
        firstName,
        lastName,
        billingStreetAddress,
        billingCity,
        billingState,
        billingCountry,
        billingZipcode,
        shopName
    } = req.body;

    // Log the incoming request body for debugging
    console.log('Incoming registration request:', req.body);

    // Validate incoming request
    if (
        !uid || !email || !username || !password || !firstName || !lastName ||
        !billingStreetAddress || !billingCity || !billingState || !billingCountry ||
        !billingZipcode || !shopName
    ) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        console.log('Registering user:', { uid, email, username });

        // Check if user already exists in MongoDB
        let user = await User.findOne({ uid });
        if (user) {
            console.log('User already exists:', uid);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('Password hashed successfully');

        // Save user to Firebase
        const firestore = admin.firestore();
        const userDoc = firestore.collection('users').doc(uid);
        const userData = {
            uid,
            email,
            username,
            firstName,
            lastName,
            billingAddress: {
                street: billingStreetAddress,
                city: billingCity,
                state: billingState,
                country: billingCountry,
                zipcode: billingZipcode,
            },
            shopName
        };
        
        console.log('Saving to Firebase:', userData);
        await userDoc.set(userData);
        console.log('User saved to Firebase successfully');

        // Create a new user for MongoDB
        user = new User({
            uid,
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            billingAddress: {
                street: billingStreetAddress,
                city: billingCity,
                state: billingState,
                country: billingCountry,
                zipcode: billingZipcode,
            },
            shopName
        });

        // Save the user to the database
        await user.save();
        console.log('User registered successfully in MongoDB:', user);

        res.json({ user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

export { authenticate };
export default router;























