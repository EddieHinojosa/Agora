import express from 'express';
import User from '../models/User.js';
import authenticateToken from './unifiedAuth.js';

const router = express.Router();

// Fetch user by username
router.get('/username/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

router.post('/update-profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, billingAddress, mailingAddress, username, shopName } = req.body;
  try {
    const user = await User.findOne({ _id: req.user.userId || req.user.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

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

