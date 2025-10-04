import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnection } from "./db_connection/dbConnect.js";
import userRoute from "./routes/userRoute.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import { securityHeaders, sessionSecurity } from "./middleware/security.js";

const app = express();

// Load env vars
dotenv.config();

// Trust proxy for accurate IP detection (important for HIPAA audit logs)
app.set('trust proxy', true);

// Enhanced security middleware
app.use(securityHeaders);
app.use(sessionSecurity);

// CORS configuration for HIPAA compliance
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173',
    'http://localhost:8000',
    'http://localhost:8080',
    process.env.CLIENT_URL || 'http://localhost:8000'
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // console.log(`CORS Request from origin: ${origin}`);
        // console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            // console.log('Allowing request with no origin');
            return callback(null, true);
        }
        
        if (allowedOrigins.includes(origin)) {
            // console.log(`Origin ${origin} is in allowed list`);
            return callback(null, true);
        }
        
        // In development, allow localhost on any port
        if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
            // console.log(`Allowing localhost origin in development: ${origin}`);
            return callback(null, true);
        }
        
        console.log(`CORS blocked origin: ${origin}`);
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200,
    preflightContinue: false
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging middleware
app.use(morgan('combined'));

// Health check route
app.get("/", (req, res) => {
    res.json({ 
        message: "Caring AI API is running 🚀",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// CORS test route
app.get("/api/cors-test", (req, res) => {
    res.json({
        message: "CORS is working!",
        origin: req.headers.origin,
        timestamp: new Date().toISOString()
    });
});

// IP detection test route (for debugging)
app.get("/api/ip-test", async (req, res) => {
    const { getUserIP, getRealPublicIP, getUserIPWithRealFallback } = await import('./utils/getUserIP.js');
    
    // Get real public IP from ipify API
    const realPublicIP = await getRealPublicIP();
    const userIPWithFallback = await getUserIPWithRealFallback(req);
    
    res.json({
        message: "IP Detection Test - PHP Style with Real Public IP",
        phpStyleDetection: getUserIP(req),
        realPublicIP: realPublicIP,
        userIPWithRealFallback: userIPWithFallback,
        expressReqIp: req.ip,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use("/api/auth", userRoute);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);

// Example API route (remove in production)
app.get("/api/users", (req, res) => {
    res.json([{ id: 1, name: "Lokesh" }, { id: 2, name: "Kumar" }]);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Database connection
dbConnection();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Caring AI Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 HIPAA Compliant Authentication enabled`);
});