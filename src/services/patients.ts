import { Patient } from "../interfaces/patient.interface";
import PatientModel from "../models/patient";

const insertPatient = async (patient: Patient): Promise<Patient> => {
	const response = await PatientModel.create(patient);
	return response;
};

const getPatients = async () => {
	const response = await PatientModel.find({});
	return response;
};

export { insertPatient, getPatients };
