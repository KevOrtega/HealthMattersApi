import { Schema, Types, Model, model } from "mongoose";

export interface Patient {
	name: string;
	lastname: string;
	email: string;
	address: string;
	phoneNumber: number;
}


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

const PatientModel = model("Patient", PatientSchema);
export default PatientModel;
