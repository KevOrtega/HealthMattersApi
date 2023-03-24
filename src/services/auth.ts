import { genSalt } from "bcryptjs";
import { Request, Response } from "express";
import { Auth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import UserModel from "../models/auth";
import { encrypt, verified } from "../utils/bcrypt";
import { generateToken } from "../utils/jw.handle";

const registerNewUser = async ({ email, password, name }: User) => {
	const checkIs = await UserModel.findOne({ email });
	if (checkIs) return "Already exists";
	const passHash = await encrypt(password)
	const registerNewUser = await UserModel.create(
		{   email, 
			password : passHash,
			name 
		}
		);
	return registerNewUser;
};

const loginUser = async ({email, password}: Auth) => {
	const checkIs = await UserModel.findOne({ email });
	if (!checkIs) return "Not found user";

	const passwordHash = checkIs.password
	const isCorrect = await verified(password, passwordHash)

	if(!isCorrect) return 'Password incorrect'
	const token = generateToken(checkIs.email)
	const data = {
		token,
		user: checkIs
	}
	return data
};

export { registerNewUser, loginUser };
