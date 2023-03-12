import { Document, Schema, model } from 'mongoose';
import mongoose from 'mongoose';

interface Doctor extends Document {
  id: string;
  name: string;
  lastname: string;
  mail: string;
  password: string;
  specialty: string;
  registration: string
  phoneNumber: string;
}

const DoctorSchema = new Schema<Doctor>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  registration: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

DoctorSchema.index({ id: 1 });

module.exports = mongoose.model('Doctor', DoctorSchema);

// const DoctorModel = model<Doctor>('Doctor', DoctorSchema);

// export { DoctorModel };
