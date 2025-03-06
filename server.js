require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const { clerkMiddleware } = require('@clerk/express');

// Import Routes
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Database Connection
const connectDB = require("./config/dbConfig");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: "*" || process.env.FRONTEND_URL })); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON request body

// Limit API Requests (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Prevent NoSQL Injection
app.use(mongoSanitize());

// Prevent Cross-Site Scripting Attacks
app.use(xssClean());

app.use(clerkMiddleware());


// API Routes
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notifications", notificationRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Quiz Platform API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;