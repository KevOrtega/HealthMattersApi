import mongoose, { Schema, Types, Model, model } from "mongoose";
import { Doctor } from "./doctor";

export interface Specialty {
	name: string;
	doctor: Types.ObjectId[] | string[];
}

const SpecialtySchema = new Schema<Specialty>(
	{
        name: {
            type: String,
            required: true,
        },
        doctor: [{
            type: Schema.Types.ObjectId, ref: 'Doctor'
        }],
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const SpecialtyModel = model('Specialty', SpecialtySchema)
export default SpecialtyModel