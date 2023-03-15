import { Schema, Types, Model, model } from "mongoose";

export interface specialty {
	name: string;
	doctor: [string];
}

const SpecialtySchema = new Schema<specialty>(
	{
        name: {
            type: String,
        },
        doctor: {
            type: [String],
        },
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const SpecialtyModel = model('Specialty', SpecialtySchema)
export default SpecialtyModel