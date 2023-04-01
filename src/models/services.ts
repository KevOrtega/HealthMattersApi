import mongoose, { Schema, Types, model, Model, ObjectId } from "mongoose";

export interface Services {
	name: string;
	description: string;
	prices: {
		atHome?: number;
		atConsultory?: number;
	};
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

	prices: {
		//type: Object,
		//required: true,
		atHome: {
			type: Number,
		},
		atConsultory: {
			type: Number,
		},
	},

	specialties: [
		{
			type: mongoose.Schema.Types.ObjectId,
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
