import mongoose, { Schema, Types, Model, model } from "mongoose";
import { Patient } from "./patient";
import { Specialty } from "./specialty";

export interface Doctor {
    name: string;
    lastname: string;
    email: string;
    specialties: Types.ObjectId[] | string[]
    registration: string;
    phoneNumber: number;
    patients: Types.ObjectId[] | string[]
    date: Types.ObjectId[] | string[]
}

const DoctorSchema = new Schema<Doctor>(
	{
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        specialties:[{
            type: mongoose.Schema.Types.ObjectId, ref: 'Specialty',
        }],
        patients: [{
            type: mongoose.Schema.Types.ObjectId, ref: "Patient"
        }],
        registration: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        email: {
            type: String
        },
        date: [{type: Schema.Types.ObjectId, ref: "Date"}]
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const DoctorModel = model('Doctors', DoctorSchema)
export default DoctorModel
