const router = require("express").Router();
const pollCtrl = require("../controllers/pollController");
const auth = require("../middleware/authMiddleware");

// All routes require authentication
router.post("/", auth, pollCtrl.createPoll);        // Create poll (admin/secretariat)
router.get("/", auth, pollCtrl.getPolls);           // Get all polls
router.post("/:id/vote", auth, pollCtrl.votePoll);  // Vote on a poll
router.get("/:id/results", auth, pollCtrl.getPollResults); // Get results

module.exports = router;