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
    image_urls: {
        type: [String],
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    productLength: {
        type: Number,
        required: false,
    },
    productWidth: {
        type: Number,
        required: false,
    },
    productHeight: {
        type: Number,
        required: false,
    },
    packedLength: {
        type: Number,
        required: true,
    },
    packedWidth: {
        type: Number,
        required: true,
    },
    packedHeight: {
        type: Number,
        required: true,
    },
    packedWeight: {
        type: Number,
        required: true,
    },
    processingTime:{
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: true
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        // required: true,
    },
    shopName: {
        type: String,
        required: true,
        
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        // required: false,
    },
    shippingAddress: {
        type: String,
        required: true
    },
    material: {
        type: Array,
        required: false
    },
    scent: {
        type: Array,
        required: false
    },
    style: {
        type: Array,
        required: false
    },
    size: {
        type: Array,
        required: false
    },
    color: {
        type: Array,
        required: false
    },



});

const Product = mongoose.model('Product', ProductSchema);

export default Product;