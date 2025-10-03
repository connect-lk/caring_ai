import express from "express";
import { login, signUp, verify } from "../controllers/userController.js";


const userRoute = express.Router();

// Max 5 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 requests
    message: {
        message: "Too many login attempts. Try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});


userRoute.post("/signUp", signUp)
userRoute.get("/verify", verify)
userRoute.post("/login", loginLimiter, login)