import { Schema, Types, model, Model } from "mongoose";

export interface Services {
	name: string;
	description: string;
	price: number;
	availability: string;
	// patients: Types.ObjectId | string;
	specialties: Types.ObjectId[] | string[];
	date: Types.ObjectId[] | string;
}

const ServiceSchema = new Schema<Services>({
	name: {
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
	// patients: [{
	//     type: Schema.Types.ObjectId, ref: "patients",

	// }],
	specialties: [
		{
			type: Schema.Types.ObjectId,
			ref: "specialties",
		},
	],
	date: [
		{
			type: Schema.Types.ObjectId,
			ref: "date",
		},
	],
});

const ServiceModel: Model<Services> = model("services", ServiceSchema);
export default ServiceModel;
