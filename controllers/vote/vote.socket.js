import Poll from "../../models/poll.js";
import Vote from "../../models/vote.js";

export default function registerVoteHandlers(io, socket) {

  // Join a poll room
  socket.on("join_poll", async ({ pollId }) => {
    try {
      if (!pollId) {
        socket.emit("error", { message: "pollId is required" });
        return;
      }

      const poll = await Poll.findById(pollId);

      if (!poll) {
        socket.emit("error", { message: "Poll not found" });
        return;
      }

      socket.join(pollId);

      socket.emit("joined_poll", {
        pollId,
        question: poll.question,
        options: poll.options,
        isActive: poll.isActive,
        expiresAt: poll.expiresAt
      });
    } catch {
      socket.emit("error", { message: "Failed to join poll" });
    }
  });

  // Cast a vote
  socket.on("vote", async ({ pollId, optionId, userId }) => {
    try {
      if (!pollId || !optionId || !userId) {
        socket.emit("error", { message: "Invalid vote payload" });
        return;
      }

      const poll = await Poll.findById(pollId);

      if (!poll) {
        socket.emit("error", { message: "Poll not found" });
        return;
      }

      if (!poll.isActive || poll.expiresAt < new Date()) {
        socket.emit("error", { message: "Poll is closed" });
        return;
      }

      // DB-level double-vote protection
      await Vote.create({
        poll: pollId,
        user: userId,
        optionId
      });

      // Atomic increment
      await Poll.updateOne(
        { _id: pollId, "options._id": optionId },
        { $inc: { "options.$.votes": 1 } }
      );

      const updatedPoll = await Poll.findById(pollId);

      io.to(pollId).emit("poll_update", {
        pollId,
        options: updatedPoll.options
      });

    } catch (err) {
      if (err.code === 11000) {
        socket.emit("error", { message: "You have already voted" });
        return;
      }

      socket.emit("error", { message: "Vote failed" });
    }
  });
}
