import { useParams, Link } from "react-router-dom";
import { Patient } from "../../types";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Button } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

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
  }, [id]);

  console.log(patient)

  return (
    <div>
      <Typography variant="h3" component="h1" sx={{ py: 2 }}>
        {patient?.name} {patient?.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
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
      <Button component={Link} to="/" variant="contained" color="primary" sx={{ my: 1 }}>Back</Button>
    </div>
  );
};

export default PatientPage;
