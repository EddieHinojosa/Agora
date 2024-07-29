import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET, { expiresIn: '1h' });
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
  
      const jwtToken = generateToken(user);
      res.json({ user, token: jwtToken });
    } catch (error) {
      console.error('Error during firebase-login:', error);
      res.status(500).json({ message: error.message });
    }
  });

router.post('/set-username-password', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.VITE_JWT_SECRET);
        const user = await User.findById(decodedToken.id);

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

        const jwtToken = generateToken(user);
        res.json({ user, token: jwtToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;






















