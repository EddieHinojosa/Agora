import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    default: "", // Default value for street
  },
  city: {
    type: String,
    required: true,
    default: "", // Default value for city
  },
  state: {
    type: String,
    required: true,
    default: "", // Default value for state
  },
  zip: {
    type: String,
    required: true,
    default: "", // Default value for zip
  },
  country: {
    type: String,
    required: true,
    default: "", // Default value for country
  },
});

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
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
