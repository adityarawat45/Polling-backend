import express from "express";
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


export default app;
