const router = require("express").Router()
const caseCtrl = require("../controllers/caseController")
const auth = require("../middleware/authMiddleware")

router.post("/submit",auth,caseCtrl.submitCase)

router.get("/",auth,caseCtrl.getCases)

router.put("/status",auth,caseCtrl.updateStatus)

module.exports = router