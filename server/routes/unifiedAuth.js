import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import User from "../models/User.js";

// Middleware to verify both JWT and Firebase tokens
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Try to verify as a JWT token first
    const decodedJWT = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.user = decodedJWT;
    return next();
  } catch (error) {
    // If JWT verification fails, try to verify as a Firebase token
    try {
      const decodedFirebaseToken = await admin.auth().verifyIdToken(token);
      req.user = decodedFirebaseToken;
      return next();
    } catch (firebaseError) {
      console.error("Error verifying token:", firebaseError);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
};

export default authenticateToken;
