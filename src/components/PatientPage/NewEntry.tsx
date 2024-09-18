import React, { useState } from "react";
import { Typography, TextField, Box, Button, MenuItem } from "@mui/material";
import { Patient, Entry, NewEntry } from "../../types";
import patientsService from "../../services/patients";
import axios from "axios";

interface Props {
  patient: Patient;
  onClose: () => void;
}

const AddNewEntry: React.FC<Props> = ({ patient, onClose }) => {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEntrySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const diagnosisCodesArray = diagnosisCodes.split(" ").filter((code) => code.trim() !== "");

      let newEntry: NewEntry;

      switch (entryType) {
        case "HealthCheck":
          newEntry = {
            type: "HealthCheck",
            date,
            description,
            specialist,
            diagnosisCodes: diagnosisCodesArray,
            healthCheckRating: Number(healthCheckRating),
          };
          break;
        case "OccupationalHealthcare":
          newEntry = {
            type: "OccupationalHealthcare",
            date,
            description,
            specialist,
            diagnosisCodes: diagnosisCodesArray,
            employerName,
            sickLeave:
              sickLeaveStartDate && sickLeaveEndDate
                ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
                : undefined,
          };
          break;
        case "Hospital":
          newEntry = {
            type: "Hospital",
            date,
            description,
            specialist,
            diagnosisCodes: diagnosisCodesArray,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;
        default:
          throw new Error("Invalid entry type");
      }

      await patientsService.createEntry(newEntry, patient.id);
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data || "An error occurred");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <Box component="form" onSubmit={handleEntrySubmit} sx={{ "& > :not(style)": { m: 1, maxWidth: "36rem" } }}>
      <Typography variant="h5">Create new entry for {patient.name}</Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <TextField
        select
        fullWidth
        label="Entry Type"
        value={entryType}
        onChange={(e) => setEntryType(e.target.value as Entry["type"])}
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField fullWidth label="Specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
      <TextField
        fullWidth
        label="Diagnosis Codes"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
      />

      {entryType === "HealthCheck" && (
        <TextField
          fullWidth
          label="Health Check Rating"
          type="number"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(e.target.value)}
        />
      )}

      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            fullWidth
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Sick Leave Start Date"
            type="date"
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Sick Leave End Date"
            type="date"
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {entryType === "Hospital" && (
        <>
          <TextField
            fullWidth
            label="Discharge Date"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Discharge Criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </>
      )}

      <Button fullWidth variant="contained" type="submit">
        Submit new entry
      </Button>
    </Box>
  );
};

export default AddNewEntry;
