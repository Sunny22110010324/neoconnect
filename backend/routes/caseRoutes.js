const router = require("express").Router();
const caseCtrl = require("../controllers/caseController");
const auth = require("../middleware/authMiddleware");

// All routes require authentication
router.post("/", auth, caseCtrl.submitCase);          // Submit a new case
router.get("/", auth, caseCtrl.getCases);             // Get all cases (role-based)
router.get("/:id", auth, caseCtrl.getCaseById);       // Get single case
router.put("/:id/assign", auth, caseCtrl.assignCase); // Assign case to case manager
router.put("/:id", auth, caseCtrl.updateCase);        // Update status/notes
// You may add delete if needed, but not in spec

module.exports = router;