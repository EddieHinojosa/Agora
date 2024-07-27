import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Gets user 
router.get('/user', async (req, res) => {
  const { username, email } = req.query;

  try {
    let user;
    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    } else if (req.user && req.user._id) {
      user = await User.findById(req.user._id);
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
