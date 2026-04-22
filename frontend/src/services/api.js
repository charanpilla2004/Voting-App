
import axios from "axios";

const API = "http://localhost:8000/polls";

export const getPolls = () => axios.get(API);

export const createPoll = (data) =>
  axios.post(API, data);

export const votePoll = (id, data) =>
  axios.post(`${API}/${id}/vote`, data);

export const deletePoll = (id, data) =>
  axios.delete(`${API}/${id}`, { data });

export const getResults = (id) =>
  axios.get(`${API}/${id}/results`);