import Assessment from "../models/Assessment.js";

// Create new assessment
export const createAssessment = async(req, res, next) => {
    try {
        const newAssessment = new Assessment({
            ...req.body,
            createdBy: req.user.id
        });

        const saved = await newAssessment.save();
        res.locals.targetId = saved._id; // for audit log
        res.json({ message: "Assessment scheduled", assessment: saved });
    } catch (err) {
        return res.status(500).json({ message: "Error scheduling assessment" });
    }
    next();
}


// Update assessment
export const updateAssessment = async(req, res, next) => {
    try {
        const updated = await Assessment.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Not found" });

        res.locals.targetId = updated._id;
        res.json({ message: "Assessment updated", assessment: updated });
    } catch (err) {
        return res.status(500).json({ message: "Error updating assessment" });
    }
    next();
}