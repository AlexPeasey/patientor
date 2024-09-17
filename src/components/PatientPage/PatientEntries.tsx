import React from "react";
import { Typography, Paper, Grid, Chip } from "@mui/material";
import {
  Entry,
  HealthCheckEntry as HealthCheckEntryInterface,
  OccupationalHealthcareEntry as OccupationalHealthcareEntryInterface,
  HospitalEntry as HospitalEntryInterface,
  HealthCheckRating,
} from "../../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Battery6Bar as Battery6BarIcon,
  Battery5Bar as Battery5BarIcon,
  Battery4Bar as Battery4BarIcon,
  BatteryAlert as BatteryAlertIcon,
  BatteryUnknown as BatteryUnknownIcon,
} from "@mui/icons-material";
import styles from "./PatientEntry.module.css";

type Props = {
  entry: Entry;
  children: React.ReactNode;
};

const PatientEntry: React.FC<Props> = ({ entry, children }) => {
  return (
    <Paper elevation={3} className={styles.entryContainer}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={styles.entryDate}>
            {entry.date}
          </Typography>
        </Grid>
        {children}
      </Grid>
    </Paper>
  );
};

const getHealthCheckRatingText = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "Healthy";
    case HealthCheckRating.LowRisk:
      return "Low Risk";
    case HealthCheckRating.HighRisk:
      return "High Risk";
    case HealthCheckRating.CriticalRisk:
      return "Critical Risk";
    default:
      return "Unknown";
  }
};

const getHealthIcon = (rating: HealthCheckRating): React.ReactElement => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <Battery6BarIcon style={{ color: "#4caf50" }} />;
    case HealthCheckRating.LowRisk:
      return <Battery5BarIcon style={{ color: "#ffeb3b" }} />;
    case HealthCheckRating.HighRisk:
      return <Battery4BarIcon style={{ color: "#ff9800" }} />;
    case HealthCheckRating.CriticalRisk:
      return <BatteryAlertIcon style={{ color: "#f44336" }} />;
    default:
      return <BatteryUnknownIcon style={{ color: "#9e9e9e" }} />;
  }
};

export const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryInterface }> = ({ entry }) => {
  return (
    <PatientEntry entry={entry}>
      <Grid item xs={12} display="flex" alignItems="center">
        <MedicalInformationIcon color="primary" />
        <Typography variant="body1" className={styles.entryDescription}>
          {entry.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Chip
          icon={getHealthIcon(entry.healthCheckRating)}
          label={`Health Check Rating: ${getHealthCheckRatingText(entry.healthCheckRating)}`}
          className={styles.healthRating}
        />
      </Grid>
      <Grid item xs={12} display="flex" alignItems="center">
        <AccountCircleIcon fontSize="small" />
        <Typography variant="body2" className={styles.specialist}>
          {entry.specialist}
        </Typography>
      </Grid>
    </PatientEntry>
  );
};

export const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryInterface }> = ({ entry }) => {
  return (
    <PatientEntry entry={entry}>
      <Grid item xs={12} display="flex" alignItems="center">
        <WorkIcon color="primary" />
        <Typography variant="body1" className={styles.entryDescription}>
          {entry.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Chip label={`Employer: ${entry.employerName}`} className={styles.employerChip} />
      </Grid>
      <Grid item xs={12} display="flex" alignItems="center">
        <AccountCircleIcon fontSize="small" />
        <Typography variant="body2" className={styles.specialist}>
          {entry.specialist}
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" alignItems="center" fontStyle="italic">
        {entry.sickLeave ? (
          <Typography>
            Patient given sick leave from {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        ) : null}
      </Grid>
    </PatientEntry>
  );
};

export const HospitalEntry: React.FC<{ entry: HospitalEntryInterface }> = ({ entry }) => {
  return (
    <PatientEntry entry={entry}>
      <Grid item xs={12} display="flex" alignItems="center">
        <LocalHospitalIcon color="primary" />
        <Typography variant="body1" className={styles.entryDescription}>
          {entry.description}
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" alignItems="center">
        <AccountCircleIcon fontSize="small" />
        <Typography variant="body2" className={styles.specialist}>
          {entry.specialist}
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" alignItems="center" fontStyle="italic">
        {entry.discharge ? (
          <Typography>
            Patient discharged on {entry.discharge.date}. {entry.discharge.criteria}
          </Typography>
        ) : null}
      </Grid>
    </PatientEntry>
  );
};
