import { useParams, Link } from "react-router-dom";
import { Patient } from "../../types";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchSinglePatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    if (id) {
      void fetchSinglePatient(id);
    }
  }, [id]);

  return (
    <div>
      <Typography variant="h3" component="h1" sx={{ py: 2 }}>
        {patient?.name} {patient?.gender === "female" ? <FemaleIcon fontSize="large" /> : <MaleIcon fontSize="large" />}
      </Typography>
      <Typography variant="h6" component="div" sx={{ py: 1 }}>
        DOB: {patient?.dateOfBirth}
      </Typography>
      <Typography variant="h6" component="div" sx={{ py: 1 }}>
        SSN: {patient?.ssn}
      </Typography>
      <Typography variant="h6" component="div" sx={{ py: 1 }}>
        Occupation: {patient?.occupation}
      </Typography>
      <Typography variant="h4" component="h2" sx={{ py: 2 }}>
        Entries
      </Typography>
      {patient?.entries.map((entry) => {
        return (
          <>
            <Typography variant="h5" component="h3">
              {entry.date}
            </Typography>
            <Typography>{entry.description}</Typography>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li>{code}</li>
              ))}
            </ul>
          </>
        );
      })}
      <Button component={Link} to="/" variant="contained" color="primary" sx={{ my: 1 }}>
        Back
      </Button>
    </div>
  );
};

export default PatientPage;
