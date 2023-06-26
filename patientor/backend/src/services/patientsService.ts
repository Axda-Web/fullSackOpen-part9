import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entries: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entries,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
};
