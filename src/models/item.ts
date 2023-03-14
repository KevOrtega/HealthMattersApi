import { Schema, Types, Model, model } from "mongoose";

export interface Doctor {
    name: string;
    lastname: string;
    email: string;
    specialty: string;
    registration: string;
    phoneNumber: number;
}

const DoctorSchema = new Schema<Doctor>(
	{
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        specialty: {
            type: String
        },
        registration: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        email: {
            type: String
        }
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const DoctorModel = model('Doctors', DoctorSchema)
export default DoctorModel
