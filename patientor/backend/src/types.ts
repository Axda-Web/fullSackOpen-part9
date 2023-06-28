export enum Gender {
  "male" = "male",
  "female" = "female",
  "other" = "other",
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export interface Entry {}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;
