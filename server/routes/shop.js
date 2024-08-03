import express from 'express';
import User from '../models/User.js';
import authenticateToken from './unifiedAuth.js';

const router = express.Router();

router.post('/signup', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId || req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

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






