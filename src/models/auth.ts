import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interface/user.interface";

const UserSchema = new Schema<User>({
	name: {
		type: String,
	},
	password: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	description: {
		type: String,
	},
	medicalLicense: {
		type: String
	},

	userRef: { // Agregar la propiedad userRef al esquema
		type: Schema.Types.ObjectId,
		ref: 'User'
	  }
});

const UserModel = model("users", UserSchema);
export default UserModel;
