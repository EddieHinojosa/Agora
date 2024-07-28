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

// Gets user
router.get('/user', authenticate, async (req, res) => {
  const { username, email } = req.query;

  try {
    let user;
    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    } else if (req.user && req.user.uid) {
      user = await User.findById(req.user.uid);
    } else {
      return res.status(400).send('Username, email, or user ID is required');
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

