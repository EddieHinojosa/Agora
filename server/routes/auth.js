import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const router = express.Router();

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.VITE_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};
// Check unique email
// User registration
router.get("/check-unique-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.json({ message: "Email is unique" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check unique username
router.get("/check-unique-username", async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already in use" });
    }
    res.json({ message: "Username is unique" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check unique shop name
router.get("/check-unique-shopname", async (req, res) => {
  const { shopName } = req.query;
  try {
    const user = await User.findOne({ shopName });
    if (user) {
      return res.status(400).json({ message: "Shop name already in use" });
    }
    res.json({ message: "Shop name is unique" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User registration
router.post("/register", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    username,
    shopName,
    billingStreetAddress,
    billingCity,
    billingState,
    billingCountry,
    billingZipcode,
    mailingStreetAddress,
    mailingCity,
    mailingState,
    mailingCountry,
    mailingZipcode,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      billingAddress: {
        street: billingStreetAddress,
        city: billingCity,
        state: billingState,
        country: billingCountry,
        zip: billingZipcode,
      },
      mailingAddress: {
        street: mailingStreetAddress,
        city: mailingCity,
        state: mailingState,
        country: mailingCountry,
        zip: mailingZipcode,
      },
      shopName,
    });

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.VITE_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Get current user
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password from the returned user data
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

// Password Reset Request
router.post("/password-reset-request", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.VITE_JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error sending email", error: error.message });
      } else {
        res
          .status(200)
          .json({ message: "Password reset email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Password Reset
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/logout", async (res) => {
  res.status(200).json({ message: "Logged out" });
});

export default router;
