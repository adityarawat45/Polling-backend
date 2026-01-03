import { Server } from "socket.io";
import registerVoteHandlers from "../controllers/vote/vote.socket.js";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    registerVoteHandlers(io, socket);
  });

  return io;
}
