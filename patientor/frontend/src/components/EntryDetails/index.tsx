import { Entry, Diagnosis } from "../../types";
import assertNever from "../../utils";

import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

type EntryDetailsProps = {
  entry: Entry;
  diagnosis: Diagnosis[];
};
const EntryDetails = ({ entry, diagnosis }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnosis={diagnosis} />
      );
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnosis={diagnosis} />;
    default:
      return assertNever(entry);
  }
};
export default EntryDetails;
