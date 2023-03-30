import { Auth } from "./auth.interface";
import { Types } from "mongoose";

export interface User extends Auth {
	name: string;
	description: string;
	userRef: Types.ObjectId | string;
}
