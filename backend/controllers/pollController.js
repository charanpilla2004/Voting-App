

import Poll from "../models/Poll.js";


export const getPolls = async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
};


export const createPoll = async (req, res) => {
  const { question, options, createdBy } = req.body;

  const poll = await Poll.create({
    question,
    createdBy,
    options: options.map(o => ({
      text: o,
      votes: 0
    })),
    voters: []
  });

  res.json(poll);
};


export const votePoll = async (req, res) => {
  const { id } = req.params;
  const { optionIndex, voterId } = req.body;

  const poll = await Poll.findById(id);

  if (!poll) {
    return res.status(404).json({
      message: "Poll not found"
    });
  }

  if (poll.voters.includes(voterId)) {
    return res.status(403).json({
      message: "Already voted"
    });
  }

  poll.options[optionIndex].votes += 1;
  poll.voters.push(voterId);

  await poll.save();

  res.json(poll);
};



export const deletePoll = async (req, res) => {
  await Poll.findByIdAndDelete(req.params.id);

  res.json({
    message: "Poll deleted"
  });
};



export const getResults = async (req, res) => {
  const poll = await Poll.findById(req.params.id);

  const totalVotes = poll.options.reduce(
    (sum, o) => sum + o.votes,
    0
  );

  res.json({
    question: poll.question,
    results: poll.options,
    totalVotes
  });
};