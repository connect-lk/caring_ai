import AuditLog from "../models/AuditLog.js";

export const auditLogger = (action, targetType) => {
  return async (req, res, next) => {
    const originalSend = res.send;

    res.send = async function (body) {
      try {
        await AuditLog.create({
          userId: req.user?.id || "anonymous",
          role: req.user?.role || "unknown",
          action,
          targetId: res.locals?.targetId || null,
          targetType,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
          status: res.statusCode >= 400 ? "FAILURE" : "SUCCESS"
        });
      } catch (err) {
        console.error("Audit log failed:", err);
      }

      return originalSend.apply(this, arguments);
    };

    next();
  };
};
