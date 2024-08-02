import express from 'express';
import admin from 'firebase-admin';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify Firebase ID Token
const authenticateFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Firebase login
router.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        firebaseId: uid,
        firstName: '',
        lastName: '',
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.VITE_JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error('Error during Firebase login:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Firebase user registration (if needed)
router.post('/register', authenticateFirebaseToken, async (req, res) => {
  const { firstName, lastName, username, shopName, billingStreetAddress, billingCity, billingState, billingCountry, billingZipcode, mailingStreetAddress, mailingCity, mailingState, mailingCountry, mailingZipcode } = req.body;

  try {
    let user = await User.findOne({ email: req.user.email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      email: req.user.email,
      firstName,
      lastName,
      username,
      billingAddress: {
        street: billingStreetAddress,
        city: billingCity,
        state: billingState,
        country: billingCountry,
        zip: billingZipcode,
      },
      mailingAddress: {
        street: mailingStreetAddress,
        city: mailingCity,
        state: mailingState,
        country: mailingCountry,
        zip: mailingZipcode,
      },
      shopName
    });

    await user.save();
    res.json({ user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export { authenticateFirebaseToken };
export default router;