import mongoose from "mongoose";
import { mongoUri } from "./env.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (err) {
        console.error('MongoDB connection failed', err);
        process.exit(1);
    }
}