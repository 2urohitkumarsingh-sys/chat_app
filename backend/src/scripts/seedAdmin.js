import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root or backend
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/chat_app";
    console.log(`Connecting to ${mongoUri}...`);

    await mongoose.connect(mongoUri);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123456", salt);

    const admin = await User.findOneAndUpdate(
      { email: "admin@chatify.com" },
      {
        fullName: "System Admin",
        password: hashedPassword,
        role: "admin"
      },
      { upsert: true, new: true }
    );

    console.log("------------------------------------------");
    if (admin) {
      console.log(`SUCCESS: Admin account ready!`);
      console.log(`Email: admin@chatify.com`);
      console.log(`Password: admin123456`);
    } else {
      console.log("FAILED to create admin account.");
    }
    console.log("------------------------------------------");
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seed();
