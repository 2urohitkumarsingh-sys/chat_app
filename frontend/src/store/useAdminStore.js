import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set) => ({
  stats: null,
  users: [],
  messages: [],
  settings: [],
  logs: [],
  isLoading: false,

  getStats: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/stats");
      set({ stats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getAllUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (userData) => {
    try {
      const res = await axiosInstance.post("/admin/users", userData);
      set((state) => ({ users: [res.data, ...state.users] }));
      toast.success("User created successfully");
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  },

  resetPassword: async (userId, newPassword) => {
    try {
      await axiosInstance.post(`/admin/users/${userId}/reset-password`, { newPassword });
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const res = await axiosInstance.patch(`/admin/users/${userId}/role`, { role });
      set((state) => ({
        users: state.users.map((user) => (user._id === userId ? res.data : user)),
      }));
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteUser: async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getAllMessages: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/messages");
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/admin/messages/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getSettings: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/settings");
      set({ settings: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const res = await axiosInstance.patch("/admin/settings", { settings: settingsData });
      set({ settings: res.data });
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getLogs: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/logs");
      set({ logs: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
