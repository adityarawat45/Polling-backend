import Poll from "../../models/poll.js";

export const createPoll = async (req, res) => {
  try {
    const { question, options, expiresAt, createdBy } = req.body;

    if (!question || !options?.length || !expiresAt || !createdBy) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const poll = await Poll.create({
      question,
      options,
      expiresAt,
      createdBy
    });

    res.status(201).json(poll);
  } catch {
    res.status(500).json({ message: "Failed to create poll" });
  }
};

export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json(poll);
  } catch {
    res.status(500).json({ message: "Failed to fetch poll" });
  }
};

export const closePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndUpdate(
      req.params.pollId,
      { isActive: false },
      { new: true }
    );

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json({ message: "Poll closed", poll });
  } catch {
    res.status(500).json({ message: "Failed to close poll" });
  }
};

export const getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json({
      pollId: poll._id,
      question: poll.question,
      options: poll.options
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
