import mongoose, { Schema, Types, Model, model } from "mongoose";


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
            type: mongoose.Schema.Types.ObjectId, ref: 'specialties',
        }],
        patients: [{
            type: mongoose.Schema.Types.ObjectId, ref: "patients"
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
        date: [{type: Schema.Types.ObjectId, ref: "date"}]
    },
);

const DoctorModel = model('doctors', DoctorSchema)
export default DoctorModel
