import { Schema, model, Types } from "mongoose";

export interface Date{
    date: string;
    patients: Types.ObjectId | string;
    time: string
}

const DateSchema = new Schema<Date>(
    {
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String
        },
        patients: [{
            type: Schema.Types.ObjectId,
            ref: "patients",
            required: true
        }]
    }
)

const DateModel = model('date', DateSchema)
export default DateModel