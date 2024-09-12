import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>({});
  const { id } = useParams();
  useEffect(() => {
    const fetchSinglePatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    if (id) {
      void fetchSinglePatient(id);
    }
  }, []);

  return (
    <div>
      <Typography variant="h1" style={{ marginTop: "1.5rem" }}>
        {patient?.name}
      </Typography>
      <Typography>SSN: {patient?.ssn}</Typography>
      <Typography>Occupation: {patient?.occupation}</Typography>
    </div>
  );
};

export default PatientPage;
