import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "SuperAdmin"], default: "Admin" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
}, { timestamps: true });

export default mongoose.model("User", userSchema);