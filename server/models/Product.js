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
        //instead of "productType" we can use "category"
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
    //instaed of "Images" we can use "image_urls"
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
        required: true,
    },
    productWidth: {
        type: Number,
        required: true,
    },
    productHeight: {
        type: Number,
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },

});

const Product = mongoose.model('Product', ProductSchema);

export default Product;