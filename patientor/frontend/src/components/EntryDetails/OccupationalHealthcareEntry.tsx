import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

type OccupationalHealthcareEntryProps = {
  entry: OccupationalHealthcareEntry;
  diagnosis: Diagnosis[];
};
const OccupationalHealthcare = ({
  entry,
  diagnosis,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div
      key={entry.id}
      style={{
        border: "2px solid black",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnosis?.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
      <p>diagnose by {entry.specialist}</p>
      {entry.sickLeave && (
        <p>
          sick leave: from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
    </div>
  );
};
export default OccupationalHealthcare;
