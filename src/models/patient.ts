import { Schema, Types, model } from "mongoose";

export interface Patient {
	name: string;
	lastname: string;
	email: string;
	address?: string;
	phoneNumber?: number;
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
		required: true,
		unique: true,
	},
	address: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
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
	},
});

const PatientModel = model("patients", PatientSchema);
export default PatientModel;
