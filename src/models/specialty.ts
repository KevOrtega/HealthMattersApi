import { Schema, model, Types, Model, ObjectId } from "mongoose";

export interface Specialty {
    _id: ObjectId;
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