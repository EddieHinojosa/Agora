import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: function() { return !this.googleId; },
        unique: true,
    },
    password: {
        type: String,
        required: function() { return !this.googleId; },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    billingAddress: {
        type: AddressSchema,
        required: true,
    },
    mailingAddress: {
        type: AddressSchema,
        required: true,
    },
    shopName: {
        type: String,
    },
    isGmail: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', UserSchema);

export default User;







