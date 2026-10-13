require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const db = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;

// Trust Render's reverse proxy in production
if (isProduction) {
  app.set("trust proxy", 1);
}

// SSL certificate for Aiven MySQL
const caPath = path.join(__dirname, "certs", "ca.pem");

let caCertificate;

if (process.env.DB_CA_CERT) {
  caCertificate = process.env.DB_CA_CERT.replace(/\\n/g, "\n");
} else {
  caCertificate = fs.readFileSync(caPath, "utf8");
}

// CORS configuration
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Parse incoming request data
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Login rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many login attempts. Please try again after 15 minutes.",
  },
});

// MySQL session store
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca: caCertificate,
    rejectUnauthorized: true,
  },

  createDatabaseTable: true,
});

// Session middleware
app.use(
  session({
    name: "cams.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

// Authentication routes
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CAMS Backend API",
  });
});

// Database health check
app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "CAMS Backend + MySQL connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`CAMS backend running on port ${PORT}`);
});
