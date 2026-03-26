import User from "../models/User.js";
import Message from "../models/Message.js";
import Setting from "../models/Setting.js";
import Log from "../models/Log.js";
import bcrypt from "bcryptjs";

// Helper to create logs
export const createLog = async (userId, action, details) => {
  try {
    await Log.create({ userId, action, details });
  } catch (error) {
    console.error("Error creating activity log:", error);
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMessages = await Message.countDocuments();
    
    // Last 24 hours stats
    const past24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const newUsersLast24h = await User.countDocuments({ createdAt: { $gte: past24Hours } });
    const messagesLast24h = await Message.countDocuments({ createdAt: { $gte: past24Hours } });

    res.status(200).json({
      totalUsers,
      totalMessages,
      newUsersLast24h,
      messagesLast24h,
    });
  } catch (error) {
    console.log("Error in getDashboardStats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    
    await createLog(req.user._id, "USER_CREATED", `Admin created user: ${email}`);

    const result = newUser.toObject();
    delete result.password;

    res.status(201).json(result);
  } catch (error) {
    console.log("Error in createUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await createLog(req.user._id, "PASSWORD_RESET", `Admin reset password for user: ${user.email}`);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetUserPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await createLog(req.user._id, "ROLE_UPDATED", `Admin changed role of ${user.email} to ${role}`);

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUserRole:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;
    await User.findByIdAndDelete(id);

    // Optional: Delete all messages by this user
    await Message.deleteMany({ $or: [{ senderId: id }, { receiverId: id }] });

    await createLog(req.user._id, "USER_DELETED", `Admin deleted user and data: ${userEmail}`);

    res.status(200).json({ message: "User and their data deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("senderId", "fullName email profilePic")
      .populate("receiverId", "fullName email profilePic")
      .sort({ createdAt: -1 })
      .limit(100); // Limit to last 100 for performance
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getAllMessages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await createLog(req.user._id, "MESSAGE_DELETED", "Admin deleted message for content moderation");

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.find();
    
    // Initialize default settings if none exist
    if (settings.length === 0) {
      const defaults = [
        { key: "registration_enabled", value: true, description: "Allow new user signups" },
        { key: "max_message_length", value: 2000, description: "Maximum characters per message" },
        { key: "site_announcement", value: "", description: "Global banner text" }
      ];
      await Setting.insertMany(defaults);
      settings = await Setting.find();
    }

    res.status(200).json(settings);
  } catch (error) {
    console.log("Error in getSettings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body; // Array of {key, value}
    
    const updatePromises = settings.map(s => 
      Setting.findOneAndUpdate({ key: s.key }, { value: s.value }, { new: true })
    );
    
    await Promise.all(updatePromises);
    
    await createLog(req.user._id, "SETTINGS_UPDATED", `Admin updated group of ${settings.length} system settings`);

    const updated = await Setting.find();
    res.status(200).json(updated);
  } catch (error) {
    console.log("Error in updateSettings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("userId", "fullName email profilePic")
      .sort({ createdAt: -1 })
      .limit(30);
    res.status(200).json(logs);
  } catch (error) {
    console.log("Error in getLogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPublicSettings = async (req, res) => {
  try {
    const settings = await Setting.find({
      key: { $in: ["registration_enabled", "site_announcement", "max_message_length"] }
    });
    
    // Convert array to simple key-value object
    const publicConfig = settings.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {});

    res.status(200).json(publicConfig);
  } catch (error) {
    console.log("Error in getPublicSettings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};