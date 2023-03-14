import { Schema, Types, Model, model } from "mongoose";
import { Doctor } from "../interfaces/doctor.interface";

const ItemSchema = new Schema<Doctor>(
	{
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        specialty: {
            type: String
        },
        registration: {
            type: String
        },
        phoneNumber: {
            type: Number
        }
    },
	{
		timestamps: true,
		versionKey: false,
	}
);

const ItemModel = model('Items', ItemSchema)
export default ItemModel