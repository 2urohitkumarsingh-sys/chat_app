import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  getDashboardStats,
  getAllUsers,
  createUser,
  resetUserPassword,
  updateUserRole,
  deleteUser,
  getAllMessages,
  deleteMessage,
  getSettings,
  updateSettings,
  getLogs,
  getPublicSettings,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/public-settings", getPublicSettings);
router.get("/stats", protectRoute, isAdmin, getDashboardStats);
router.get("/users", protectRoute, isAdmin, getAllUsers);
router.post("/users", protectRoute, isAdmin, createUser);
router.post("/users/:id/reset-password", protectRoute, isAdmin, resetUserPassword);
router.patch("/users/:id/role", protectRoute, isAdmin, updateUserRole);
router.delete("/users/:id", protectRoute, isAdmin, deleteUser);
router.get("/messages", protectRoute, isAdmin, getAllMessages);
router.delete("/messages/:id", protectRoute, isAdmin, deleteMessage);
router.get("/settings", protectRoute, isAdmin, getSettings);
router.patch("/settings", protectRoute, isAdmin, updateSettings);
router.get("/logs", protectRoute, isAdmin, getLogs);

export default router;
