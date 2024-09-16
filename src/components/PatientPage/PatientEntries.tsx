import { Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../../types";

type Props = {
  entry: Entry;
};

const PatientEntry = ({ entry }: Props, children: React.ReactNode) => {
  return (
    <div>
      <h4>{entry.date}</h4>
      {children}
    </div>
  );
};

export const HealthCheckEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }: Props) => {
  return (
    <PatientEntry entry={entry}>
      <p>Entry type: {entry.type}</p>
    </PatientEntry>
  );
};

export const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }: Props) => {
  return (
    <PatientEntry entry={entry}>
      <p>Entry type: {entry.type}</p>
    </PatientEntry>
  );
};

export const HospitalEntry: React.FC<{ entry: HospitalEntry }> = ({ entry }: Props) => {
  return (
    <PatientEntry entry={entry}>
      <p>Entry type: {entry.type}</p>
    </PatientEntry>
  );
};
