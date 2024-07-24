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
            billingAddress: {
                street: billingAddress.street,
                city: billingAddress.city,
                state: billingAddress.state,
                zip: billingAddress.zip,
                country: billingAddress.country,
            },
            mailingAddress: {
                street: mailingAddress.street,
                city: mailingAddress.city,
                state: mailingAddress.state,
                zip: mailingAddress.zip,
                country: mailingAddress.country,
            },
            shopName,
            isGmail // Add this flag to indicate Gmail address
        });

        await user.save();
        res.json({ message: 'Registration successful' });
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














