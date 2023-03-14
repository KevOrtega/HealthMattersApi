import { Schema, Types, Model, model } from "mongoose";
import { Patient } from "../interfaces/patient.interface";

const PatientSchema = new Schema<Patient>(
	{
		name: {
			type: String,
		},
		lastname: {
			type: String,
		},
		email: {
			type: String,
		},
		address: {
			type: String,
		},

		phoneNumber: {
			type: Number,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const PatientModel = model("Paciente", PatientSchema);
export default PatientModel;
