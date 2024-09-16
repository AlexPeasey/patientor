import { useParams, Link } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import { Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const { id } = useParams();
  // Fetch patient data
  useEffect(() => {
    const fetchSinglePatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    if (id) {
      void fetchSinglePatient(id);
    }
  }, [id]);

  // Fetch diagnoses data
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const diagnosisLookup = useMemo(() => {
    if (!diagnoses) return {};
    return diagnoses.reduce((acc, diagnosis) => {
      acc[diagnosis.code] = diagnosis.name;
      return acc;
    }, {} as Record<string, string>);
  }, [diagnoses]);

  if (!patient) {
    return (
      <Typography variant="h5" component="h1" sx={{ py: 2 }}>
        Loading...
      </Typography>
    );
  }

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
          <div key={entry.id}>
            <Typography variant="h5" component="h3">
              {entry.date}
            </Typography>
            <Typography>{entry.description}</Typography>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  <Typography>{code}: {diagnosisLookup[code] || "Unknown diagnosis"}</Typography>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <Button component={Link} to="/" variant="contained" color="primary" sx={{ my: 1 }}>
        Back
      </Button>
    </div>
  );
};

export default PatientPage;
