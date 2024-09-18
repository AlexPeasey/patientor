import { Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { Patient, Entry } from "../../types";
import patientsService from "../../services/patients";
import axios from "axios";

interface Props {
  patient: Patient;
  type: Entry["type"];
  onClose: () => void;
}

const NewEntry = ({ patient, type, onClose }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEntrySubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const diagnosisCodesArray = diagnosisCodes.split(" ");

      const newEntry = {
        date,
        description,
        specialist,
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes: diagnosisCodesArray,
        type,
      };

      await patientsService.createEntry(newEntry, patient.id);

      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data || "An error occurred");
        }
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <>
      <Typography variant="h5">Create new entry for {patient.name}</Typography>
      {errorMessage ? <Typography color="red">Error: {errorMessage}</Typography> : null}
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, maxWidth: "36rem" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleEntrySubmit}
      >
        <TextField fullWidth label="Date" type="text" value={date} onChange={(event) => setDate(event.target.value)} />
        <TextField
          fullWidth
          label="Description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          fullWidth
          label="Specialist"
          type="text"
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
        <TextField
          fullWidth
          label="Health check rating"
          type="text"
          value={healthCheckRating}
          onChange={(event) => setHealthCheckRating(event.target.value)}
        />
        <TextField
          fullWidth
          label="Diagnosis Codes"
          type="text"
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
        />
        <Button fullWidth variant="contained" type="submit">
          Submit new entry
        </Button>
      </Box>
    </>
  );
};

export default NewEntry;
