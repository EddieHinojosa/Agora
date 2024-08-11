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

// Get all Products by Category
router.get('/categories/:category', async (req, res) => {
    const category = req.params.category;
    if (category === "food&drink") {
        try {
            const products = await Product.find({ 
                category: { 
                    $in: ["tableware", "drinkware"] 
                 }  
            });
            res.status(200).json(products);
        }
        catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: "Error fetching products", error });
        }
    } else {    
        try {
        const products = await Product.find({ category: category });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
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
        // If the field is an array, push the new value to the existing array
        for (const field in productUpdates) {
            if (
                field === "image_urls"
                || field === "tags" 
                || field === "color" 
                || field === "size"
                || field === "material"
                || field === "scent"
            )  {
                updatedFields[field] = Array.from(new Set(targetProduct[field].concat(productUpdates[field])));
            }
            else if (productUpdates[field] !== targetProduct[field]) {
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


// Shop Manager Status Card Route
router.get('/api/count/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const activeCount = await Product.countDocuments({ user: userId });
      const soldOutCount = await Product.countDocuments({ user: userId, status: 'Sold Out' });
      const totalQuantity = await Product.aggregate([
        { $match: { user: userId, status: { $ne: 'Inactive' } } },
        { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } }
      ]);
      const totalCount = totalQuantity.length > 0 ? totalQuantity[0].totalQuantity : 0;
  
      res.status(200).json({ activeCount, soldOutCount, totalCount });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });

// Product Delete Route
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

// Search Route
router.get('/results', async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            $text: { $search: query }
        })
        res.json(products)
        console.log(products)
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for products' })
        console.log("Danger Will Robinson:", error)
    }
})

export default router;