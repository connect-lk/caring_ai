// routes/auditLogRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/checkPermission.js";
import { getAuditLogs } from "../controllers/auditLogController.js";

const router = express.Router();

// Only SuperAdmin can read audit logs
router.get(
    "/",
    authMiddleware,
    checkPermission("auditLogs", "read"),
    getAuditLogs
);

export default router;