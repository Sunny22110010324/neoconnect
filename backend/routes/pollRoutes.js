const router = require("express").Router()
const pollCtrl = require("../controllers/pollController")

router.post("/create",pollCtrl.createPoll)

router.get("/",pollCtrl.getPolls)

module.exports = router