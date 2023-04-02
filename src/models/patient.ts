import { Schema, Types, model } from "mongoose";

export interface Patient {
	name: string;
	lastname: string;
	email: string;
	address: string;
	phoneNumber: number;
	date: Types.ObjectId[] | string;
	doctors: Types.ObjectId | string;
	services: Types.ObjectId | string;
	deleted: boolean;
	password: string;
}

const PatientSchema = new Schema<Patient>({
	name: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	address: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	date: [
		{
			type: Schema.Types.ObjectId,
			ref: "date",
		},
	],
	doctors: [
		{
			type: Schema.Types.ObjectId,
			ref: "doctors",
		},
	],
	services: [
		{
			type: Schema.Types.ObjectId,
			ref: "services",
		},
	],
	deleted: {
		type: Boolean,
		default: false, // por defecto, el paciente no está eliminado
	},
});

const PatientModel = model("patients", PatientSchema);
export default PatientModel;
