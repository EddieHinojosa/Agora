import express from 'express';
import authRoutes from './auth.js';
import shopRoutes from './shop.js';
import userRoutes from './user.js';
import newProduct from './newProduct.js';
import getProduct from './products.js';
import unifiedAuth from './unifiedAuth.js';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/shop', shopRoutes);
router.use('/user', userRoutes);
router.use('/newproduct', newProduct);
router.use('/products', getProduct);
router.use('/unifiedauth', unifiedAuth);

export default router;