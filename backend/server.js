const express = require("express")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const caseRoutes = require("./routes/caseRoutes")
const pollRoutes = require("./routes/pollRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/cases",caseRoutes)
app.use("/api/polls",pollRoutes)

app.get("/",(req,res)=>{
 res.send("NeoConnect API Running")
})

app.listen(process.env.PORT,()=>{
 console.log("Server running on port "+process.env.PORT)
})