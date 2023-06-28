import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Man4Icon from "@mui/icons-material/Man4";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();
  useEffect(() => {
    patientService.getByid(id!).then((data) => setPatient(data));
  }, [id]);

  let genderIcon;

  switch (patient?.gender) {
    case "male":
      genderIcon = <MaleIcon />;
      break;
    case "female":
      genderIcon = <FemaleIcon />;
      break;
    default:
      genderIcon = <Man4Icon />;
  }
  return (
    <>
      <div>
        <h1>
          {patient?.name} {genderIcon}
        </h1>
        <p>ssh: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </div>
      <div>
        <h3>Entries</h3>
        {patient?.entries.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
export default PatientInfo;
