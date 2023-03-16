import mongoose, { Schema, Model, model, Types } from "mongoose";

export interface Date{
    date: Date;
    doctor: Types.ObjectId | string;
    patient: Types.ObjectId | string;
    
}

const DateSchema = new Schema<Date>(
    {
        date: {
            type: Date,
            required: true,
        },
        doctor: {
         type: Schema.Types.ObjectId,
          ref: "Doctor",
          required: true,
        },
        patient: [{
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        }]
    }
)

const DateModel = model('Date', DateSchema)
export default DateModel