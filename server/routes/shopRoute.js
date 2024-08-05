import express from 'express';
import User from '../models/User.js';
import authenticateToken from './auth.js';

const router = express.Router();

// Route to get user data for shop manager
router.get('/shopmanager/user/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Route to get url shopname slug
router.get('/shop/:slug', async (req, res) => {
  try {
      const user = await User.findOne({ slug: req.params.slug });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


export default router;

