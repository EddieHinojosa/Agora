import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    sparse: true,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  password: String,
  firebaseId: {
    type: String,
    unique: true,
    sparse: true,
  },
  billingAddress: AddressSchema,
  mailingAddress: AddressSchema,
  shopName: String,
  isGmail: {
    type: Boolean,
    default: false,
  },
});


const User = mongoose.model("User", UserSchema);

export default User;
