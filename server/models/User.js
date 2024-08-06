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
  slug: {
    type: String,
    unique: true,
  },
  shopShippingAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  shopDescription: String,
  isGmail: {
    type: Boolean,
    default: false,
  },
});

// Middleware to generate slug
UserSchema.pre("save", async function (next) {
  if (this.isModified("shopName")) {
    const shopSlug = slugify(this.shopName, { lower: true, strict: true });
    let slug = shopSlug;
    let count = 1;

    // Unique check
    while (await mongoose.models.User.findOne({ slug })) {
      slug = `${shopSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }

  next();
});


const User = mongoose.model("User", UserSchema);

export default User;
