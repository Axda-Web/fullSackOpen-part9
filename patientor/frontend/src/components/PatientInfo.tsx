import { useState, useEffect } from "react";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnosis";
import { Patient, Diagnosis } from "../types";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Man4Icon from "@mui/icons-material/Man4";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const { id } = useParams();
  useEffect(() => {
    patientService.getByid(id!).then((data) => setPatient(data));
    diagnoseService.getAll().then((data) => setDiagnosis(data));
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
                <li key={code}>
                  {code} {diagnosis?.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
export default PatientInfo;
