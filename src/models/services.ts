import mongoose, { Schema, Types, model, Model, ObjectId } from "mongoose";

export interface Services {
	name: string;
	description: string;
	price: number;
	availability: string;
	specialties: Types.ObjectId[] | string[];
	date: Types.ObjectId[] | string;
	doctor: Types.ObjectId[] | string;
	rating: number;
	image: string;
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
	image: {
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
