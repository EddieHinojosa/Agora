import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    billingAddress: { type: String, required: true },
    mailingAddress: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    shopName: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
