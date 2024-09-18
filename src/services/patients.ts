import axios from "axios";
import { Patient, PatientFormValues, EntryFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: EntryFormValues, patientId: string) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, object);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  createEntry
};
