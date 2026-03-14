const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a poll – only Admin/Secretariat allowed
exports.createPoll = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN" && req.user.role !== "SECRETARIAT") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { question, options } = req.body;
    if (!question || !options || !Array.isArray(options)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const poll = await prisma.poll.create({
      data: {
        question,
        options: JSON.stringify(options) // store as JSON string
      }
    });
    res.status(201).json(poll);
  } catch (error) {
    console.error("Create poll error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all polls (with user's vote)
exports.getPolls = async (req, res) => {
  try {
    const userId = req.user.id;
    const polls = await prisma.poll.findMany({
      include: {
        votes: {
          where: { userId },
          select: { option: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    const formatted = polls.map(p => ({
      ...p,
      options: JSON.parse(p.options),
      userVote: p.votes.length ? p.votes[0].option : null
    }));
    res.json(formatted);
  } catch (error) {
    console.error("Get polls error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Vote on a poll
exports.votePoll = async (req, res) => {
  try {
    const pollId = parseInt(req.params.id);
    const { option } = req.body;
    const userId = req.user.id;

    const existing = await prisma.vote.findUnique({
      where: { userId_pollId: { userId, pollId } }
    });
    if (existing) return res.status(400).json({ message: "Already voted" });

    const vote = await prisma.vote.create({
      data: { userId, pollId, option }
    });
    res.status(201).json(vote);
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ message: "Server error" });
  }
};