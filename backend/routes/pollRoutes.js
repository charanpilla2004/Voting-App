import express from "express";

import {
  getPolls,
  createPoll,
  votePoll,
  deletePoll,
  getResults
} from "../controllers/pollController.js";

const router = express.Router();

router.get("/", getPolls);
router.post("/", createPoll);
router.post("/:id/vote", votePoll);
router.delete("/:id", deletePoll);
router.get("/:id/results", getResults);

export default router;