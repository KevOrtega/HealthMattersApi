import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interface/user.interface";

const OrderSchema = new Schema<User>({
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
});

const OrderModel = model("order", OrderSchema);
export default OrderModel;
