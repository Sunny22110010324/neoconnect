const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['https://neoconnect-mauve.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const pollRoutes = require("./routes/pollRoutes");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/polls", pollRoutes);

// Test database endpoint (optional)
app.get("/api/test-db", async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `;
    res.json({
      success: true,
      message: "Database connected",
      userCount,
      tables
    });
  } catch (error) {
    console.error("DB TEST ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "NeoConnect Backend Running 🚀"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});