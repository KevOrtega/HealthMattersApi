import mongoose, { Schema, Types, Model, model } from "mongoose";
import { Date } from "./date";

export interface Patient {
	name: string;
	lastname: string;
	email: string;
	address: string;
	phoneNumber: number;
	date: Types.ObjectId[] | string;
	doctors: Types.ObjectId | string;
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
			type: Schema.Types.ObjectId, ref: 'date'
		}],
		doctors: [{
			type: Schema.Types.ObjectId, ref: 'doctors'
		}],
		services: [{
			type: Schema.Types.ObjectId, ref: 'services'
		}]
	},
	
);

const PatientModel = model("patients", PatientSchema);
export default PatientModel;
