import express from 'express';
import admin from 'firebase-admin';
import Product from '../models/Product';

const router = express.Router()

// Middleware to verify Firebase ID Token
const authenticate = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Create a new Product

router.post('/newProduct', authenticate, async (req , res) => {

    const newProductData = {...req.query}

    try {
        const newProduct = await Product.create(newProductData);
        res.status(201).json(newProduct);
    }
    catch {
        console.error("Error creating product, product not created", err);
        res.status(500).json({message: "Error creating product"});
    }

})

export default router;