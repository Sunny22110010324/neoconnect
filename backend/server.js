const express = require("express")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const caseRoutes = require("./routes/caseRoutes")
const pollRoutes = require("./routes/pollRoutes")

const app = express()

app.use(cors({
  origin: "*"
}))

app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/cases",caseRoutes)
app.use("/api/polls",pollRoutes)

app.get("/",(req,res)=>{
 res.send("NeoConnect API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})