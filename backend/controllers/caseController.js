const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Helper to generate tracking ID: NEO-YYYY-001
async function generateTrackingId() {
  const year = new Date().getFullYear();
  const lastCase = await prisma.case.findFirst({
    where: { trackingId: { startsWith: `NEO-${year}` } },
    orderBy: { id: "desc" }
  });
  let nextNum = 1;
  if (lastCase) {
    const lastNum = parseInt(lastCase.trackingId.split("-")[2]);
    nextNum = lastNum + 1;
  }
  return `NEO-${year}-${String(nextNum).padStart(3, "0")}`;
}

// 1. Submit a new case (any authenticated user)
exports.submitCase = async (req, res) => {
  try {
    const { category, department, location, severity, anonymous, description } = req.body;
    const trackingId = await generateTrackingId();

    const newCase = await prisma.case.create({
      data: {
        trackingId,
        category,
        department,
        location,
        severity,
        anonymous,
        description,
        status: "New",
        userId: anonymous ? null : req.user.id
      }
    });

    res.status(201).json(newCase);
  } catch (error) {
    console.error("Submit case error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Get all cases (role-based)
exports.getCases = async (req, res) => {
  try {
    const user = req.user;
    let cases;

    if (user.role === "ADMIN" || user.role === "SECRETARIAT") {
      cases = await prisma.case.findMany({
        include: {
          user: { select: { id: true, name: true, email: true } },
          assignedUser: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" }
      });
    } else if (user.role === "CASE_MANAGER") {
      cases = await prisma.case.findMany({
        where: { assignedTo: user.id },
        include: {
          user: { select: { id: true, name: true, email: true } }
        },
        orderBy: { createdAt: "desc" }
      });
    } else {
      cases = await prisma.case.findMany({
        where: { userId: user.id },
        include: {
          assignedUser: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" }
      });
    }

    res.json(cases);
  } catch (error) {
    console.error("Get cases error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Get a single case by ID (with access control)
exports.getCaseById = async (req, res) => {
  try {
    const caseId = parseInt(req.params.id);
    const caseItem = await prisma.case.findUnique({
      where: { id: caseId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        assignedUser: { select: { id: true, name: true } }
      }
    });

    if (!caseItem) return res.status(404).json({ message: "Case not found" });

    const user = req.user;
    if (user.role === "ADMIN" || user.role === "SECRETARIAT") {
      // allowed
    } else if (user.role === "CASE_MANAGER") {
      if (caseItem.assignedTo !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
    } else {
      if (caseItem.userId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.json(caseItem);
  } catch (error) {
    console.error("Get case by id error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 4. Assign a case to a case manager (Admin/Secretariat only)
exports.assignCase = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN" && req.user.role !== "SECRETARIAT") {
      return res.status(403).json({ message: "Access denied" });
    }

    const caseId = parseInt(req.params.id);
    const { assignedTo } = req.body;

    const updatedCase = await prisma.case.update({
      where: { id: caseId },
      data: {
        assignedTo,
        status: "Assigned"
      }
    });

    res.json(updatedCase);
  } catch (error) {
    console.error("Assign case error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 5. Update case status and/or notes (Case Manager, Admin, Secretariat)
exports.updateCase = async (req, res) => {
  try {
    const caseId = parseInt(req.params.id);
    const { status, notes } = req.body;

    const caseItem = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseItem) return res.status(404).json({ message: "Case not found" });

    const user = req.user;
    if (user.role !== "ADMIN" && user.role !== "SECRETARIAT") {
      if (caseItem.assignedTo !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    const updatedCase = await prisma.case.update({
      where: { id: caseId },
      data: {
        status: status || caseItem.status,
        notes: notes || caseItem.notes
      }
    });

    res.json(updatedCase);
  } catch (error) {
    console.error("Update case error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 6. Get resolved cases for public hub (any authenticated user)
exports.getResolvedCases = async (req, res) => {
  try {
    const cases = await prisma.case.findMany({
      where: { status: "Resolved" },
      select: {
        trackingId: true,
        category: true,
        department: true,
        description: true,
        createdAt: true,
        notes: true
      },
      orderBy: { updatedAt: "desc" },
      take: 20
    });
    res.json(cases);
  } catch (error) {
    console.error("Get resolved cases error:", error);
    res.status(500).json({ message: "Server error" });
  }
};