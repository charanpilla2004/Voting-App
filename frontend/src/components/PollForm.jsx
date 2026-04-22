
import { useState } from "react";
import { createPoll } from "../services/api";
import { usePoll } from "../context/PollContext";

export default function PollForm() {
  const { fetchPolls } = usePoll();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const userId =
    localStorage.getItem("userId") ||
    Math.random().toString(36).substring(2);

  localStorage.setItem("userId", userId);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const updateOption = (i, value) => {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  };

  const submit = async () => {
    await createPoll({
      question,
      options,
      createdBy: userId
    });

    setQuestion("");
    setOptions(["", ""]);
    fetchPolls();
  };

  return (
    <div className="card">
      <h2>Create Poll</h2>

      <input
        className="input"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question"
      />

      {options.map((opt, i) => (
        <input
          key={i}
          className="input"
          value={opt}
          onChange={(e) => updateOption(i, e.target.value)}
          placeholder={`Option ${i + 1}`}
        />
      ))}

      <button className="btn" onClick={addOption}>
        Add Option
      </button>

      <button className="btn btn-primary" onClick={submit}>
        Create Poll
      </button>
    </div>
  );
}