import { useParams, Link } from "react-router-dom";
import { Patient, Diagnosis, Entry } from "../../types";
import { Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "./PatientEntries";
import AddNewEntry from "./NewEntry";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const { id } = useParams();

  const fetchSinglePatient = async (id: string) => {
    const patient = await patientService.getPatient(id);
    setPatient(patient);
  };

  // Fetch patient data
  useEffect(() => {
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

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const handleShowNewEntry = () => {
    setShowNewEntry(true);
  };

  const handleClose = async () => {
    if (id) {
      await fetchSinglePatient(id);
    }
    setShowNewEntry(false);
  };

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
      <Button onClick={handleShowNewEntry}>Add new entry</Button>
      {showNewEntry && diagnoses && <AddNewEntry patient={patient} diagnoses={diagnoses} onClose={handleClose} />}
      {patient?.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  <Typography>
                    {code}: {diagnosisLookup[code] || "Unknown diagnosis"}
                  </Typography>
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
