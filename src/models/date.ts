import { Schema, model, Types } from "mongoose";

export interface Date{
    date: Date;
    doctors: Types.ObjectId | string;
    patients: Types.ObjectId | string;
    
}

const DateSchema = new Schema<Date>(
    {
        date: {
            type: Date,
            required: true,
        },
        doctors: {
         type: Schema.Types.ObjectId,
          ref: "doctors",
          required: true,
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