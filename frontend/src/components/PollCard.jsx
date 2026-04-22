
import { votePoll, deletePoll } from "../services/api";
import { usePoll } from "../context/PollContext";
import ProgressBar from "./ProgressBar";

export default function PollCard({ poll }) {
  const { fetchPolls } = usePoll();

  const userId = localStorage.getItem("userId");

  let voterId =
    localStorage.getItem("voterId") ||
    Math.random().toString(36).substring(2);

  localStorage.setItem("voterId", voterId);

  const vote = async (i) => {
    await votePoll(poll._id, {   // FIXED HERE
      optionIndex: i,
      voterId
    });

    fetchPolls();
  };

  const remove = async () => {
    await deletePoll(poll._id, { userId });   // FIXED HERE
    fetchPolls();
  };

  const total = poll.options.reduce((a, b) => a + b.votes, 0);

  return (
    <div className="poll">
      <h3>{poll.question}</h3>

      <p>Total Votes: {total}</p>

      {poll.options.map((opt, i) => {
        const percent =
          total === 0 ? 0 : (opt.votes / total) * 100;

        return (
          <div key={i}>
            <button
              className="vote-btn"
              onClick={() => vote(i)}
            >
              {opt.text}
            </button>

            <ProgressBar percent={percent} />

            <small>{percent.toFixed(1)}%</small>
          </div>
        );
      })}

      {poll.createdBy === userId && (
        <button
          className="btn btn-danger"
          onClick={remove}
        >
          Delete
        </button>
      )}
    </div>
  );
}