import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
// import connectDB from "./config/db.js";
// import initSocket from "./config/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// connectDB(); //db
// initSocket(server); //socket inita

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
