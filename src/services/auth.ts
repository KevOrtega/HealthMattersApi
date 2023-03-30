import { Auth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import UserModel from "../models/auth";
import { encrypt, verified } from "../utils/bcrypt";
import { generateToken } from "../utils/jw.handle";
import jwt from "jsonwebtoken"
import PatientModel from "../models/patient";
import DoctorModel from "../models/doctor";
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const registerNewUser = async ({ email, password, name, medicalLicense }: User) => {}



const loginUser = async ({ email, password }: Auth) => {
	const checkIs = await UserModel.findOne({ email });
	if (!checkIs) return "Not found user";

	const passwordHash = checkIs.password;
	const isCorrect = await verified(password, passwordHash);

	if (!isCorrect) return "Password incorrect";
	const token = generateToken(checkIs.email);

	const data = {
		token,
		user: checkIs,
	};
	return data;
};

export { registerNewUser, loginUser };
