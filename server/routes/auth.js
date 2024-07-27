import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const generateToken = (user) => {
    if (!process.env.VITE_JWT_SECRET) {
        console.error('JWT secret is not defined');
        throw new Error('JWT secret is not defined');
    }
    return jwt.sign(
        { sub: user.id, email: user.email },
        process.env.VITE_JWT_SECRET,
        { expiresIn: '7d' }
    );
};

router.post('/register', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

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
    if (req.user) {
        // Existing user
        const token = generateToken(req.user);
        res.redirect(`${process.env.VITE_PROD_URL}?token=${token}`);
    } else if (req.authInfo && req.authInfo.profileData) {
        // New user, redirect to registration with pre-filled data
        res.redirect(`${process.env.VITE_PROD_URL}/register?profile=${req.authInfo.profileData}`);
    }
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
            street: req.body.billingStreetAddress,
            city: req.body.billingCity,
            state: req.body.billingState,
            zip: req.body.billingZipcode,
            country: req.body.billingCountry,
        };
        user.mailingAddress = {
            street: req.body.mailingStreetAddress,
            city: req.body.mailingCity,
            state: req.body.mailingState,
            zip: req.body.mailingZipcode,
            country: req.body.mailingCountry,
        };
        user.shopName = req.body.shopName;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;




















