export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - User details not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Admin access required" });
    }

    next();
  } catch (error) {
    console.log("Error in isAdmin middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
