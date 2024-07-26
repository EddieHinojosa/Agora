import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
        //instead of "product type" we can use "category"
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
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
    length: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    package_length: {
        type: Number,
        required: true,
    },
    package_width: {
        type: Number,
        required: true,
    },
    package_height: {
        type: Number,
        required: true,
    },
    package_weight: {
        type: Number,
        required: true,
    },

});

const Product = mongoose.model('Product', ProductSchema);

export default Product;