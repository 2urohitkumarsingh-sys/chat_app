import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Could be system-level action
    },
    action: {
      type: String,
      required: true,
      enum: [
        "SIGNUP",
        "LOGIN",
        "LOGOUT",
        "USER_CREATED",
        "USER_DELETED",
        "ROLE_UPDATED",
        "PASSWORD_RESET",
        "MESSAGE_DELETED",
        "SETTINGS_UPDATED",
      ],
    },
    details: {
      type: String,
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
