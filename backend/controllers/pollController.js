const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a poll (Secretariat/Admin only)
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body; // options as array of strings
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all polls (with user's vote if any)
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
    // Transform options from JSON string back to array
    const formattedPolls = polls.map(poll => ({
      ...poll,
      options: JSON.parse(poll.options),
      userVote: poll.votes.length > 0 ? poll.votes[0].option : null
    }));
    res.json(formattedPolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Vote on a poll
exports.votePoll = async (req, res) => {
  try {
    const pollId = parseInt(req.params.id);
    const { option } = req.body;
    const userId = req.user.id;

    // Check if already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_pollId: { userId, pollId }
      }
    });
    if (existingVote) {
      return res.status(400).json({ message: "Already voted" });
    }

    const vote = await prisma.vote.create({
      data: {
        userId,
        pollId,
        option
      }
    });
    res.status(201).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get results for a poll
exports.getPollResults = async (req, res) => {
  try {
    const pollId = parseInt(req.params.id);
    const votes = await prisma.vote.findMany({
      where: { pollId },
      select: { option: true }
    });
    // Count votes per option
    const results = votes.reduce((acc, v) => {
      acc[v.option] = (acc[v.option] || 0) + 1;
      return acc;
    }, {});
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};