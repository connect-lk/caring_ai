// auditLog.model.js
import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    recordType: String,
    recordId: mongoose.Schema.Types.ObjectId,
    ip: String,
    userAgent: String,
    meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const AuditLog = mongoose.model("AuditLog", auditSchema);

export default AuditLog;