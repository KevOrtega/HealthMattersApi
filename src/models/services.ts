import { Schema, Types, model, Model } from "mongoose";

export interface Services {
	name: string;
	description: string;
	price: number;
	availability: string;
	specialties: Types.ObjectId[] | string[];
	date: Types.ObjectId[] | string;
	doctor: Types.ObjectId[] | string;
	rating: number;
}

const ServiceSchema = new Schema<Services>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},
	availability: {
		type: String,
		required: true,
	},
	specialties: [
		{
			type: Schema.Types.ObjectId,
			ref: "specialties",
			required: true,
		},
	],
	doctor: [
		{
			type: Schema.Types.ObjectId,
			ref: "doctors",
			required: true,
		},
	],
	date: [
		{
			type: Schema.Types.ObjectId,
			ref: "date",
			required: true,
		},
	],
	rating: {
		type: Number,
		required: true,
	},
});

const ServiceModel: Model<Services> = model("services", ServiceSchema);
export default ServiceModel;
