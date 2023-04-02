import { Schema, model } from "mongoose";
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
		type: String,
	},
});

const UserModel = model("users", UserSchema);
export default UserModel;
