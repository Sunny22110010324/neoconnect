const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const pollRoutes = require("./routes/pollRoutes");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Test database route (temporary for debugging)
app.get("/api/test-db", async (req, res) => {
  try {
    // Try to query the User table
    const userCount = await prisma.user.count();
    // Get list of tables in public schema
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

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/polls", pollRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "NeoConnect API",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});