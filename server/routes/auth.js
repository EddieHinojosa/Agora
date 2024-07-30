import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {admin} from '../firebaseAdmin.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';



dotenv.config();

const router = express.Router();

const authenticate = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
      console.log('Verifying token:', idToken); // Log the token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
  } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

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

          await user.save();
          console.log('User saved to MongoDB:', user);

          const userDoc = admin.firestore().collection('users').doc(uid);
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

router.post('/set-username-password', verifyJwtToken, async (req, res) => {
  const { username, password } = req.body;

  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already taken' });
      }

      const user = await User.findById(req.user.id);
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


export default router;






















