import { Schema, Types, Model, model } from "mongoose";

export interface Services {
	name: string;
	description: string;
	price: number;
	availability: string;
    patients: Types.ObjectId | string;
    doctors: Types.ObjectId | string;
}

const ServiceSchema = new Schema<Services>(
	{
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        doctors: {
            type: Schema.Types.ObjectId, ref: "doctors"
        },
        price: {
            type: Number,
        },
		availability: {
			type: String,
		},
        patients: [{
            type: Schema.Types.ObjectId, ref: "patients"
        }]
    },
);

const ServiceModel = model('services', ServiceSchema)
export default ServiceModel
