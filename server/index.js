import express from "express"
const app = express();
import dotenv from "dotenv";
import { dbConnection } from "./db_connection/dbConnect.js";

// Load env vars
dotenv.config();
// Middleware
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// Example API route
app.get("/api/users", (req, res) => {
    res.json([{ id: 1, name: "Lokesh" }, { id: 2, name: "Kumar" }]);
});
dbConnection()
    // Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));