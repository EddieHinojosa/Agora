import express from 'express';
import Product from '../models/Product.js';

const router = express.Router()

// Create a new Product

router.post('/shopmanager/:id/newproduct', async (req , res) => {

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


// Get all Products
router.get('/', async (req,res) => {
    try{
        const allProducts = await Product.find({"user": {"$exists": true}});
        res.status(200).json(allProducts)
    } catch (error) {
        console.log("Unable to fetch:", error)
        res.status(500).json({meesage: "Error finding all products"})
    }
})

// Get all Products by single user
router.get('/shopmanager/:id/products', async (req, res) => {
    const userId = req.params.id;

    try {
        const products = await Product.find({ user : userId });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
});

router.delete('/shopmanager/:userId/products/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: productId, user: userId });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found or you do not have permission to delete this product" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
});

// Get Product by ID
router.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    
    try {
        const product = await Product.findById({_id : productId});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product" });
    }
});

// edit pruoduct by user id && product id
router.put('/shopmanager/:id/editproduct/:productId', async (req, res) => {
    const { productId } = req.params;
    const userId = req.params.id;
 

    try {
        const targetProduct = await Product.findById({ _id: productId });
        if (!targetProduct || targetProduct.user !== userId) {
            return res.status(404).json({ message: "Product not found or you do not have permission to edit this product" });
        }

        const productUpdates = req.body;
        const updatedFields = {};

        // Iterate over the fields in the request body and add only the altered fields to updatedFields
        for (const field in productUpdates) {
            if (productUpdates[field] !== targetProduct[field]) {
                updatedFields[field] = productUpdates[field];
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No fields have been altered" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            { _id: productId, user: userId },
            { $set: updatedFields },
            { new: true } // Return the updated document
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;