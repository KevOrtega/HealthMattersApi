import { Document, Schema, model, Types } from "mongoose";

interface Service extends Document {
  title: string;
  description: string;
  doctor_id: Types.ObjectId;
  availability: string;
  price: number;
  duration: number;
}

const ServiceSchema = new Schema<Service>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  doctor_id: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  availability: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
});

ServiceSchema.index({ name: 1 }); //En Mongoose, cuando definimos un índice en un esquema, podemos especificar el tipo de índice que queremos crear, que puede ser ascendente (1), descendente (-1) o en texto completo (text).

// En este caso, al especificar 1, estamos indicando que queremos un índice ascendente para el campo name. Esto significa que los documentos se ordenarán en orden ascendente según el valor de este campo cuando se realice una consulta que use este índice.

module.exports = model("Service", ServiceSchema);
