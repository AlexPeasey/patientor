import { Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";

const NewEntry = () => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const handleEntrySubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <Typography variant="h5">Create new entry</Typography>
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
