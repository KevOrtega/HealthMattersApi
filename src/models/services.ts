import { Schema, Types, Model, model } from "mongoose";

export interface Services {
	title: string;
	description: string;
	doctor: [string]
	price: number;
	availability: string;
	time: string;
}

const ServiceSchema = new Schema<Services>(
	{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        doctor: {
            type: [String],
        },
        price: {
            type: Number,
        },
		availability: {
			type: String,
		},
        time: {
            type: String
        }
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const ServiceModel = model('Services', ServiceSchema)
export default ServiceModel
