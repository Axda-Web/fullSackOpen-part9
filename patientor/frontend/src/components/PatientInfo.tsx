import { useState, useEffect } from "react";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnosis";
import { Patient, Diagnosis } from "../types";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Man4Icon from "@mui/icons-material/Man4";

import EntryDetails from "./EntryDetails";

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
        {patient?.entries.length ? (
          patient?.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis!} />
          ))
        ) : (
          <p>No entries...</p>
        )}
      </div>
    </>
  );
};
export default PatientInfo;
