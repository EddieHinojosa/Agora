import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    default: "", // Default value for street
  },
  city: {
    type: String,
    default: "", // Default value for city
  },
  state: {
    type: String,
    default: "", // Default value for state
  },
  zip: {
    type: String,    
    default: "", // Default value for zip
  },
  country: {
    type: String,
    default: "", // Default value for country
  },
});

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true
},
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  firstName: {
    type: String,
    required: false, // Change to false
  },
  lastName: {
    type: String,
    required: false, // Change to false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: function () {
      return !this.googleId && !this.uid;
    },
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.uid;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  uid: {
    type: String,
    unique: true,
    sparse: true,
  },
  billingAddress: {
    type: AddressSchema,
  },
  mailingAddress: {
    type: AddressSchema,
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
