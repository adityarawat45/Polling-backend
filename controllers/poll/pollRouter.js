import e from "express";
import { createPoll, getPoll, closePoll, getPollResults } from "./pollController.js";
const router = e.Router();

router.post("/", createPoll);

router.get("/:pollId", getPoll);

router.post("/:pollId/close", closePoll);

router.get("/:pollId/results", getPollResults);

export const pollRouter = router;