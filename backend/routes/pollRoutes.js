const router = require("express").Router();
const pollCtrl = require("../controllers/pollController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, pollCtrl.createPoll);
router.get("/", auth, pollCtrl.getPolls);
router.post("/:id/vote", auth, pollCtrl.votePoll);

module.exports = router;