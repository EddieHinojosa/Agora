import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password, billingStreetAddress, billingZipcode, billingCity, billingState, billingCountry, mailingStreetAddress, mailingZipcode, mailingCity, mailingState, mailingCountry, shopName } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email already exists' });

        user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const isGmail = email.endsWith('@gmail.com');

        user = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            billingAddress: {
                street: billingStreetAddress,
                city: billingCity,
                state: billingState,
                zip: billingZipcode,
                country: billingCountry,
            },
            mailingAddress: {
                street: mailingStreetAddress,
                city: mailingCity,
                state: mailingState,
                zip: mailingZipcode,
                country: mailingCountry,
            },
            shopName,
            isGmail
        });

        await user.save();
        const token = generateToken(user);
        res.json({ message: 'Registration successful', token });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate field value entered' });
        }
        res.status(500).json({ message: error.message });
    }
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });

      req.login(user, { session: false }, (err) => {
          if (err) return next(err);
          const token = generateToken(user);
          res.json({ message: 'Login successful', token, user });
      });
  })(req, res, next);
});

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Google OAuth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`http://localhost:3001?token=${token}`);
});

export default router;















