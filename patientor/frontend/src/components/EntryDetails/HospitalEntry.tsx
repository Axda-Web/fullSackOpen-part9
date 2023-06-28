import { HospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

type HospitalEntryProps = {
  entry: HospitalEntry;
  diagnosis: Diagnosis[];
};
const Hospital = ({ entry, diagnosis }: HospitalEntryProps) => {
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
        {entry.date} <LocalHospitalIcon />
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
      <p>
        discharge: {entry.discharge?.criteria} ({entry.discharge?.date})
      </p>
    </div>
  );
};
export default Hospital;
