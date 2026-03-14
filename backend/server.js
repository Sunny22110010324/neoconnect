const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Health check route */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "NeoConnect API",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

/* Auth routes */
app.use("/api/auth", authRoutes);

/* 404 handler */
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});