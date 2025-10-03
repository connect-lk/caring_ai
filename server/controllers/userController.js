import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signUp = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "Admin",
            verificationToken
        });

        await newUser.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        await sendEmail(
            email,
            "Verify your Caring AI account",
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Welcome to Caring AI</h2>
                <p>Thank you for registering with Caring AI Clinical Assessment Portal.</p>
                <p>Please click the button below to verify your account:</p>
                <a href="${verifyUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Verify Account</a>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666;">${verifyUrl}</p>
                <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
            </div>
            `
        );

        res.status(201).json({ 
            message: "User registered successfully. Please check your email for verification.",
            success: true 
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
}

export const verify = async(req, res) => {
    try {
        const { token } = req.params;
        
        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ 
            message: "Email verified successfully. You can now log in.",
            success: true 
        });
    } catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ message: "Error verifying email" });
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email before logging in" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || "your-super-secret-jwt-key-here-make-it-very-long-and-random-for-hipaa-compliance";
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role,
                email: user.email,
                username: user.username
            },
            jwtSecret, 
            { expiresIn: "24h" }
        );

        // Set secure HTTP-only cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/'
        };

        res.cookie('authToken', token, cookieOptions);

        // Log successful login
        console.log(`User ${user.email} logged in successfully`);

        res.json({ 
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error logging in" });
    }
}

export const logout = async(req, res) => {
    try {
        // Clear the auth cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        res.json({ 
            message: "Logout successful",
            success: true 
        });
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Error logging out" });
    }
}

export const getCurrentUser = async(req, res) => {
    try {
        // User is already attached by auth middleware
        const user = req.user;
        
        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (err) {
        console.error("Get current user error:", err);
        res.status(500).json({ message: "Error fetching user data" });
    }
}

// Test endpoint to generate a fresh verification token (for development only)
export const generateTestToken = async(req, res) => {
    try {
        if (process.env.NODE_ENV !== 'development') {
            return res.status(403).json({ message: "This endpoint is only available in development" });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        user.isVerified = false;
        await user.save();

        res.json({
            success: true,
            message: "New verification token generated",
            token: verificationToken,
            verifyUrl: `${process.env.CLIENT_URL || 'http://localhost:8000'}/verify/${verificationToken}`
        });
    } catch (err) {
        console.error("Generate test token error:", err);
        res.status(500).json({ message: "Error generating test token" });
    }
}