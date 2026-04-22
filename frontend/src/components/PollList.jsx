import { usePoll } from "../context/PollContext";
import PollCard from "./PollCard";

export default function PollList() {
  const { polls } = usePoll();

  return (
    <div>
      {polls.map((poll) => (
        <PollCard key={poll._id} poll={poll} />
      ))}
    </div>
  );
}