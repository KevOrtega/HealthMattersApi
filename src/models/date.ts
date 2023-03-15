import { Schema, Types, Model, model } from "mongoose";

export interface date{
    date: string;
    time: string;
    doctor: [string]
    patient: [string]
    service: string
}

const DateSchema = new Schema<date>(
    {
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        doctor: {
          type: [String]
        },
        patient: {
            type: [String],
        },
        service: {
            type: String
        }
    }
)

const DateModel = model('Date', DateSchema)
export default DateModel