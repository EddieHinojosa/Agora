import express from 'express';
import admin from 'firebase-admin';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify Firebase ID Token
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

router.post('/signup', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.uid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.billingAddress = {
            streetAddress: req.body.billingStreetAddress,
            zipcode: req.body.billingZipcode,
            city: req.body.billingCity,
            state: req.body.billingState,
            country: req.body.billingCountry,
        };

        user.mailingAddress = {
            streetAddress: req.body.mailingStreetAddress,
            zipcode: req.body.mailingZipcode,
            city: req.body.mailingCity,
            state: req.body.mailingState,
            country: req.body.mailingCountry,
        };

        await user.save();
        res.json({ message: 'Shop signup successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;






