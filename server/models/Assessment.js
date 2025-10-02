import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
    patientInfo: {
        patientId: String,
        name: String,
        age: Number,
        gender: String,
        contact: String
    },
    assessmentDetails: {
        type: String,
        description: String,
        notes: String
    },
    schedulingDetails: {
        scheduledDate: Date,
        doctor: String,
        location: String
    },
    consentDetails: {
        consentGiven: { type: Boolean, default: false },
        consentDate: Date,
        consentBy: String
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Assessment", assessmentSchema);