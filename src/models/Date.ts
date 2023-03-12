import { Document, Schema, model } from "mongoose";

enum DateStatus {
	CANCELLED = "cancelled",
	PENDING = "pending",
	CONFIRMED = "confirmed",
}

interface Date extends Document {
	id: string;
	patient: Schema.Types.ObjectId; // cambiar tipo de datos a Schema.Types.ObjectId
	doctor: Schema.Types.ObjectId;
	service: string;
	date: Date;
	status: DateStatus; // ahora "status" es un campo de tipo DateStatus
}

const DateSchema = new Schema<Date>({
	id: { type: String, required: true, unique: true },
	patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
	doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
	service: { type: String, required: true },
	date: { type: Date, required: true },
	status: { type: String, required: true }, // agregar el campo "status"
});

DateSchema.index({ id: 1 });

export default model("Date", DateSchema);
