import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root or backend
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const email = process.argv[2];

if (!email) {
  console.log("Usage: node src/scripts/promoteAdmin.js <email>");
  process.exit(1);
}

const promote = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/chat_app";
    console.log(`Connecting to ${mongoUri}...`);
    
    await mongoose.connect(mongoUri);
    
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() }, 
      { role: "admin" }, 
      { new: true }
    );
    
    if (user) {
      console.log("------------------------------------------");
      console.log(`SUCCESS: ${user.fullName} (${email}) is now an Admin!`);
      console.log("------------------------------------------");
    } else {
      console.log(`FAILED: User with email ${email} not found.`);
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

promote();
