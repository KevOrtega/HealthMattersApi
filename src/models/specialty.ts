import { Schema, model, Types } from "mongoose";

export interface Specialty {
	name: string;
	doctors: Types.ObjectId[] | string[];
}

const SpecialtySchema = new Schema<Specialty>(
	{
        name: {
            type: String,
            required: true,
        },
        doctors: [{
            type: Schema.Types.ObjectId, ref: 'doctors'
        }],
    },
);

const SpecialtyModel = model('specialties', SpecialtySchema)
export default SpecialtyModel