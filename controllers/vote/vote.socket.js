import Poll from "../../models/poll.js";

export default function registerVoteHandlers(io, socket) {
  socket.on("join_poll", async ({ pollId }) => {
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
      isActive: poll.isActive
    });
  });

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

      // Prevent double vote (DB-level safety)
      await Vote.create({
        poll: pollId,
        user: userId,
        optionId
      });

      // Increment vote count atomically
      await Poll.updateOne(
        { _id: pollId, "options._id": optionId },
        { $inc: { "options.$.votes": 1 } }
      );

      //  Fetch updated poll state
      const updatedPoll = await Poll.findById(pollId);

      // Broadcast to everyone in the room
      io.to(pollId).emit("poll_update", {
        pollId,
        options: updatedPoll.options
      });

    } catch (err) {
      // Duplicate vote (unique index violation)
      if (err.code === 11000) {
        socket.emit("error", { message: "You have already voted" });
        return;
      }

      socket.emit("error", { message: "Vote failed" });
    }
  });
}
