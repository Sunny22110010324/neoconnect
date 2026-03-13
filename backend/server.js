const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const caseRoutes = require("./routes/caseRoutes")
const pollRoutes = require("./routes/pollRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/cases", caseRoutes)
app.use("/api/v1/polls", pollRoutes)

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "NeoConnect API",
    uptime: process.uptime(),
    timestamp: new Date()
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running")
})