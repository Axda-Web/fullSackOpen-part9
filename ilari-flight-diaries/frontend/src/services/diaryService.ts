import axios from "axios";
import { Diaries } from "../types";

const BASE_URL = "http://localhost:3001/api/diaries";

const getAll = async (signal: AbortSignal): Promise<Diaries> => {
  const response = await axios.get<Diaries>(BASE_URL, { signal });
  return response.data;
};

export default {
  getAll,
};
