import express from "express";
import { auditLogger } from "../middlewares/auditLogger.js";
import Assessment from "../models/Assessment.js";
import { createAssessment, updateAssessment } from "../controllers/assessmentController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Create new assessment
router.post("/createAssessment", authenticate, authorize("assessments:create"), createAssessment, auditLogger("assessments:create", "Assessment"));

// Update assessment
router.put("/updateAssessment/:id", authenticate, authorize("assessments:update"), updateAssessment, auditLogger("assessments:update", "Assessment"));