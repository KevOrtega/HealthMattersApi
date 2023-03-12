import { Schema, model, Document } from "mongoose";

interface Patient extends Document {
	id: string;
	name: string;
	lastname: string;
	age: number;
	gender: string;
	email: string;
	phoneNumber: string;
	address: string;
	medicalHistory: string[];
}

const patientSchema = new Schema<Patient>({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	age: { type: Number, required: true },
	gender: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phoneNumber: { type: String, required: true, unique: true },
	address: { type: String, required: true },
	medicalHistory: { type: [String], default: [] },
});

export default model("Patient", patientSchema);
