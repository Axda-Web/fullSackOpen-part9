import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  Entry,
  NewEntry,
} from "../types";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

const addPatient = (entries: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entries,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };
  const patient = patients.find((p) => p.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getPatient,
  addPatient,
  addEntry,
};
