import "./App.css";
import PollProvider from "./context/PollContext";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";

export default function App() {
  return (
    <PollProvider>
      <div className="app">
        <h1 className="title">🗳️ Voting App</h1>
        <PollForm />
        <PollList />
      </div>
    </PollProvider>
  );
}