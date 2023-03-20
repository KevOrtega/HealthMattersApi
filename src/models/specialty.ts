import { Schema, model, Types, Model } from "mongoose";

export interface Specialty {
	name: string;
	doctors: Types.ObjectId[] | string[];
	rating: number;
}

const SpecialtySchema = new Schema<Specialty>({
	name: {
		type: String,
		required: true,
	},
	doctors: [
		{
			type: Schema.Types.ObjectId,
			ref: "doctors",
		},
	],
	rating: {
		type: Number,
		required: true,
	},
});

const SpecialtyModel: Model<Specialty> = model("specialties", SpecialtySchema);
export default SpecialtyModel;
