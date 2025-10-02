import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { roles } from "../config/roles.js";
// 🔹 Authenticate user via JWT
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// 🔹 Authorize based on role(s)
export const authorize = (permissions = []) => {
  return (req, res, next) => {
    if (!req.user || !roles[req.user.role]) {
      return res.status(403).json({ message: "Forbidden: role not recognized" });
    }

    // Check if user has at least one of the required permissions
    const allowed = roles[req.user.role].can.some(p => permissions.includes(p));
    if (!allowed) return res.status(403).json({ message: "Forbidden: insufficient rights" });

    next();
  };
};
