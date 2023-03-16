import { Schema, Types, Model, model } from "mongoose";

export interface Services {
	title: string;
	description: string;
	price: number;
	availability: string;
	time: string;
    patient: Types.ObjectId[] | string[];
}

const ServiceSchema = new Schema<Services>(
	{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        
        price: {
            type: Number,
        },
		availability: {
			type: String,
		},
        time: {
            type: String
        },
        patient: [{
            type: Schema.Types.ObjectId, ref: "Patient"
        }]
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const ServiceModel = model('Services', ServiceSchema)
export default ServiceModel
