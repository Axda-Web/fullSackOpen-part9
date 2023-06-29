import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnosis,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringEntry = (entry: unknown): string => {
  if (!isString(entry)) {
    throw new Error("Incorrect or missing entry");
  }

  return entry;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect entry type: " + entryType);
  }
  return entryType;
};

const isHealthCheckRating = (
  param: string | number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(param as string);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isString(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect health check rating type: " + healthCheckRating);
  }
  return healthCheckRating;
};

const isSickLeaveEntry = (object: unknown): boolean => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    return false;
  }
  return true;
};

const parseSickLeaveEntry = (entry: unknown): SickLeave => {
  if (!isSickLeaveEntry(entry)) {
    throw new Error("Incorrect or missing sicked leave entry");
  }
  return entry as SickLeave;
};

const isDischargeEntry = (object: unknown): boolean => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object)
  ) {
    return false;
  }
  return true;
};

const parseDischargeEntry = (entry: unknown): Discharge => {
  if (!isDischargeEntry(entry)) {
    throw new Error("Incorrect or missing discharge entry");
  }
  return entry as Discharge;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatient = {
      name: parseStringEntry(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringEntry(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringEntry(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    let newEntry;

    const sharedProps = {
      description: parseStringEntry(object.description),
      date: parseDate(object.date),
      specialist: parseStringEntry(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: parseEntryType(object.type),
    };

    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      newEntry = {
        ...sharedProps,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    }

    if (object.type === "OccupationalHealthcare" && "employerName" in object) {
      if ("sickLeave" in object) {
        newEntry = {
          ...sharedProps,
          employerName: parseStringEntry(object.employerName),
          sickLeave: parseSickLeaveEntry(object.sickLeave),
        };
      } else {
        newEntry = {
          ...sharedProps,
          employerName: parseStringEntry(object.employerName),
        };
      }
    }

    if (object.type === "Hospital" && "discharge" in object) {
      newEntry = {
        ...sharedProps,
        discharge: parseDischargeEntry(object.discharge),
      };
    }

    return newEntry as NewEntry;
  }

  throw new Error("Incorrect data: a field missing");
};
