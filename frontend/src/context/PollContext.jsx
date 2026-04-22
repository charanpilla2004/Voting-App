
import { createContext, useContext, useEffect, useState } from "react";
import { getPolls } from "../services/api";

const PollContext = createContext();

export const usePoll = () => useContext(PollContext);

export default function PollProvider({ children }) {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    const res = await getPolls();
    setPolls(res.data);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <PollContext.Provider value={{ polls, setPolls, fetchPolls }}>
      {children}
    </PollContext.Provider>
  );
}