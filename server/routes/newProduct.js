import express from 'express';
// import admin from 'firebase-admin';
import Product from '../models/Product.js';

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

router.post('/shopmanager/newproduct', async (req , res) => {

    const newProductData = {...req.body};
    console.log(newProductData);

    try {
        const newProduct = await Product.create(newProductData);
        res.status(201).json(newProduct);
    }
    catch (err){
        console.error("Error creating product, product not created", err);
        res.status(500).json({message: "Error creating product"});
    }

})

export default router;