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
		unique: true
	},
	description: {
		type: String
	}
});

const UserModel = model("users", UserSchema);
export default UserModel;
