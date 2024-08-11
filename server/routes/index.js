import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import productRoutes from './productRoutes.js';
import shopRoutes from './shopRoute.js';
import stripeRoutes from './stripe.js'


const router = express.Router();

router.use('/api/auth', authRoutes); // Regular auth routes
router.use('/', shopRoutes);
router.use('/api', userRoutes);
router.use('/' , productRoutes);
router.use('/api', stripeRoutes);

export default router;
