import AuditLog from "../models/AuditLog.js";
import { encrypt } from "../utils/fieldEncryption.js";
import { getUserIP, getUserIPWithRealFallback } from "../utils/getUserIP.js";

export const auditLogger = (action, targetType) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    const startTime = Date.now();

    res.send = async function (body) {
      try {
        const duration = Date.now() - startTime;
        console.log("auditLogger", req.user);
        // Create audit log entry with real public IP fallback
        const clientIP = await getUserIPWithRealFallback(req);
        const auditData = {
          user: req.user?.id || null,
          action,
          recordType: targetType,
          recordId: res.locals?.targetId || null,
          ip: clientIP,
          userAgent: req.headers["user-agent"] || "unknown",
          meta: {
            role: req.user?.role || "unknown",
            status: res.statusCode >= 400 ? "FAILURE" : "SUCCESS",
            duration,
            requestMethod: req.method,
            requestPath: req.path,
            responseCode: res.statusCode,
            timestamp: new Date()
          }
        };

        // Encrypt sensitive fields for HIPAA compliance
        if (auditData.user) {
          auditData.user = encrypt(auditData.user.toString());
        }
        
        await AuditLog.create(auditData);
        
        // Log security events
        if (res.statusCode >= 400) {
          console.warn(`Security Event: ${action} failed for user ${req.user?.email || 'anonymous'} from IP ${clientIP}`);
        }
      } catch (err) {
        console.error("Audit log failed:", err);
        // Don't fail the request if audit logging fails
      }

      return originalSend.apply(this, arguments);
    };

    next();
  };
};

// Enhanced audit logger for authentication events
export const authAuditLogger = () => {
  return async (req, res, next) => {
    const originalSend = res.send;
    const startTime = Date.now();

    res.send = async function (body) {
      try {
        const duration = Date.now() - startTime;
        let action = "UNKNOWN";
        
        // Determine action based on request path
        if (req.path.includes('/login')) {
          action = res.statusCode === 200 ? "LOGIN_SUCCESS" : "LOGIN_FAILED";
        } else if (req.path.includes('/logout')) {
          action = "LOGOUT";
        } else if (req.path.includes('/signup')) {
          action = res.statusCode === 201 ? "SIGNUP_SUCCESS" : "SIGNUP_FAILED";
        } else if (req.path.includes('/verify')) {
          action = res.statusCode === 200 ? "EMAIL_VERIFIED" : "EMAIL_VERIFICATION_FAILED";
        }

        const clientIP = await getUserIPWithRealFallback(req);
        const auditData = {
          user: req.user?.id || null,
          action,
          recordType: "AUTHENTICATION",
          recordId: null,
          ip: clientIP,
          userAgent: req.headers["user-agent"] || "unknown",
          meta: {
            role: req.user?.role || "unknown",
            status: res.statusCode >= 400 ? "FAILURE" : "SUCCESS",
            duration,
            requestMethod: req.method,
            requestPath: req.path,
            responseCode: res.statusCode,
            timestamp: new Date(),
            email: req.body?.email ? encrypt(req.body.email) : null
          }
        };

        await AuditLog.create(auditData);
        
        // Log critical security events
        if (action.includes("FAILED") || action.includes("FAILURE")) {
          console.warn(`Security Alert: ${action} from IP ${clientIP} at ${new Date().toISOString()}`);
        }
      } catch (err) {
        console.error("Auth audit log failed:", err);
      }

      return originalSend.apply(this, arguments);
    };

    next();
  };
};
