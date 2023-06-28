import { HealthCheckEntry, Diagnosis } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

type HealthCheckEntryProps = {
  entry: HealthCheckEntry;
  diagnosis: Diagnosis[];
};
const HealthCheck = ({ entry, diagnosis }: HealthCheckEntryProps) => {
  let heartIcon;

  switch (entry.healthCheckRating) {
    case 1:
      heartIcon = <FavoriteIcon color="action" />;
      break;
    case 2:
      heartIcon = <FavoriteIcon color="warning" />;
      break;
    case 3:
      heartIcon = <FavoriteIcon color="error" />;
      break;
    default:
      heartIcon = <FavoriteIcon color="success" />;
  }

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
        {entry.date} <MedicalServicesIcon />
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
      {heartIcon}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
export default HealthCheck;
