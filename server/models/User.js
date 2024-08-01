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
  googleId: {
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

UserSchema.pre("save", function (next) {
  if (this.shopName && !this.shopId) {
    this.shopId = new mongoose.Types.ObjectId();
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
