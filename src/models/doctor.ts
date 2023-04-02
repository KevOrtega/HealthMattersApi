import mongoose, { Schema, Types, model } from "mongoose";

export interface Doctor {
	name: string;
	lastname: string;
	email: string;
	password: string;
	specialties: Types.ObjectId[] | string;
	medicalLicense: string;
	phoneNumber: number;
	patients: Types.ObjectId[] | string[];
	date: Types.ObjectId[] | string[];
	services: Types.ObjectId[] | string[];
	image?: string;
}

const DoctorSchema = new Schema<Doctor>({
	name: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "services",
		},
	],
	specialties: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "specialties",
			required: true,
		},
	],
	patients: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "patients",
		},
	],
	medicalLicense: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	date: [
		{
			type: Schema.Types.ObjectId,
			ref: "date",
		},
	],
	image: {
		type: String,
	},
	password: {
		type: String,
	},
});

const DoctorModel = model("doctors", DoctorSchema);
export default DoctorModel;
