import express from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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





