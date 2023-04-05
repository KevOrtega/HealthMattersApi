import mongoose, { Schema, Types, model } from "mongoose";

export interface Doctor {
	name: string;
	lastname: string;
	email: string;
	password: string;
	specialties: Types.ObjectId[] | string;
	medicalLicense: string;
	phoneNumber?: number;
	patients: Types.ObjectId[] | string[];
	date: Types.ObjectId[] | string[];
	services: Types.ObjectId[] | string[];
	deleted: boolean; // nuevo campo para el borrado lógico
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
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: [
		{
			type: Schema.Types.ObjectId,
			ref: "date",
		},
	],
	password: {
		type: String,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

const DoctorModel = model("doctors", DoctorSchema);
export default DoctorModel;
