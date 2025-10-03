import express from "express";
import rateLimit from "express-rate-limit";
import { login, signUp, verify, logout, getCurrentUser, generateTestToken } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { authAuditLogger } from "../middleware/auditLogger.js";
import { createRateLimit, sanitizeRequest } from "../middleware/security.js";

const userRoute = express.Router();

// Enhanced rate limiting for login attempts
const loginLimiter = createRateLimit(
    15 * 60 * 1000, // 15 minutes
    5, // max 5 requests
    "Too many login attempts. Try again after 15 minutes."
);

// Enhanced rate limiting for signup attempts
const signupLimiter = createRateLimit(
    60 * 60 * 1000, // 1 hour
    3, // max 3 signup attempts per hour
    "Too many signup attempts. Try again after 1 hour."
);

// Rate limiting for verification attempts
const verifyLimiter = createRateLimit(
    60 * 60 * 1000, // 1 hour
    10, // max 10 verification attempts per hour
    "Too many verification attempts. Try again after 1 hour."
);

// Apply sanitization middleware to all routes
userRoute.use(sanitizeRequest);

// Public routes with audit logging
userRoute.post("/signup", signupLimiter, authAuditLogger(), signUp);
userRoute.get("/verify/:token", verifyLimiter, authAuditLogger(), verify);
userRoute.post("/login", loginLimiter, authAuditLogger(), login);

// Protected routes with audit logging
userRoute.post("/logout", authenticate, authAuditLogger(), logout);
userRoute.get("/me", authenticate, getCurrentUser);

// Development test route
userRoute.post("/generate-test-token", generateTestToken);

export default userRoute;