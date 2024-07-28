import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password, billingAddress, mailingAddress, shopName } = req.body;

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
            billingAddress,
            mailingAddress,
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = generateToken(user);
        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
    const redirectUrl = process.env.NODE_ENV === 'production'
        ? `https://agora-crafts.onrender.com?token=${token}`
        : `http://localhost:3001?token=${token}`;
    res.redirect(302, redirectUrl);
});

router.post('/update-profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.billingAddress = {
            street: req.body.billingAddress.street,
            city: req.body.billingAddress.city,
            state: req.body.billingAddress.state,
            zip: req.body.billingAddress.zip,
            country: req.body.billingAddress.country,
        };
        user.mailingAddress = {
            street: req.body.mailingAddress.street,
            city: req.body.mailingAddress.city,
            state: req.body.mailingAddress.state,
            zip: req.body.mailingAddress.zip,
            country: req.body.mailingAddress.country,
        };
        user.shopName = req.body.shopName;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;