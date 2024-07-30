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


// Update profile route
router.post('/update-profile', authenticate, async (req, res) => {
  const { firstName, lastName, billingAddress, mailingAddress, username, shopName } = req.body;
  try {
      const user = await User.findOne({ uid: req.user.uid });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.billingAddress = billingAddress;
      user.mailingAddress = mailingAddress;
      user.username = username;
      user.shopName = shopName;

      await user.save();
      res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Failed to update profile', error });
  }
});

export default router;

