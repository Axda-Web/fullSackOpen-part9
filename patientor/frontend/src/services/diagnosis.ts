import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
};
