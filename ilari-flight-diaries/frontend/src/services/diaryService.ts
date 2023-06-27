import axios from "axios";
import { Diaries, NewDiary, Diary } from "../types";

const BASE_URL = "http://localhost:3001/api/diaries";

const getAll = async (signal: AbortSignal): Promise<Diaries> => {
  const response = await axios.get<Diaries>(BASE_URL, { signal });
  return response.data;
};

const add = async (diary: NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(BASE_URL, diary);
  return response.data;
};

export default {
  getAll,
  add,
};
