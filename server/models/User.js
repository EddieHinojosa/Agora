import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    default: "",
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  state: {
    type: String,
    required: true,
    default: "",
  },
  zip: {
    type: String,
    required: true,
    default: "",
  },
  country: {
    type: String,
    required: true,
    default: "",
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
    required: function () {
      return !this.googleId;
    },
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
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
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  shopName: {
    type: String,
  },
  isGmail: {
    type: Boolean,
    default: false,
  },
});

// Shop ID if shop is created
UserSchema.pre("save", function (next) {
  if (this.shopName && !this.shopId) {
    this.shopId = new mongoose.Types.ObjectId();
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
