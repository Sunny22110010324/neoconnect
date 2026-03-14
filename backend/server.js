const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/authRoutes");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

/* Health route */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "NeoConnect API",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

/* API routes */
app.use("/api/auth", authRoutes);

/* 404 handler */
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found"
  });
});

/* Start server */
async function startServer() {

  try {

    await prisma.$connect();
    console.log("Database connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error("Database connection failed");
    console.error(error);

    process.exit(1);
  }
}

startServer();