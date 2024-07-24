import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    streetAddress: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    billingAddress: { type: addressSchema, required: true },
    mailingAddress: { type: addressSchema, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Password field added
    googleId: { type: String },
    shopName: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;

