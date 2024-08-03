import mongoose from "mongoose";
import slugify from "slugify";

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

// Pre-save hook to create a slug/URL from the shop name
UserSchema.pre("save", async function (next) {
  if (this.shopName && !this.shopURL) {
    const slug = slugify(this.shopName, { lower: true, strict: true });
    let urlExists = await mongoose.models.User.findOne({ shopURL: slug });

    if (urlExists) {
      const uniqueId = new mongoose.Types.ObjectId().toString();
      this.shopURL = `${slug}-${uniqueId}`;
    } else {
      this.shopURL = slug;
    }
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
