import mongoose, { Schema, Types, Model, model } from "mongoose";
import { Date } from "./date";

export interface Patient {
	name: string;
	lastname: string;
	email: string;
	address: string;
	phoneNumber: number;
	date: Types.ObjectId[] | Date[];
	doctor: Types.ObjectId | string;
	services: Types.ObjectId | string;
}


const PatientSchema = new Schema<Patient>(
	{
		name: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			required: true
		},
		email: {
			type: String,
		},
		address: {
			type: String,
			required: true
		},

		phoneNumber: {
			type: Number,
			required: true
		},
		date: [{
			type: Schema.Types.ObjectId, ref: 'Date'
		}],
		doctor: [{
			type: Schema.Types.ObjectId, ref: 'Doctor'
		}]
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const PatientModel = model("Patient", PatientSchema);
export default PatientModel;
