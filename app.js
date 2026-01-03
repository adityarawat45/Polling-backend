import express from "express";
import {pollRouter}  from "./controllers/poll/pollRouter.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use("/poll",  pollRouter);


export default app;
