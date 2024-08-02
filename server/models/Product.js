import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDetails: {
        type: String,
        required: true,
    },
        //instead of "product type" we can use "category"
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: false,
    }, 
    //instaed of "Images" we can use "image_url"
    image_urls: {
        type: [String],
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    productLength: {
        type: String,
        required: true,
    },
    productWidth: {
        type: String,
        required: true,
    },
    productHeight: {
        type: String,
        required: true,
    },
    packedLength: {
        type: String,
        required: true,
    },
    packedWidth: {
        type: String,
        required: true,
    },
    packedHeight: {
        type: String,
        required: true,
    },
    packedWeight: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
    },

});

const Product = mongoose.model('Product', ProductSchema);

export default Product;