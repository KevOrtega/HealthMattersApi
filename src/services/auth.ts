import { Auth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import UserModel from "../models/auth";
import DoctorModel from "../models/doctor";
import PatientModel from "../models/patient";
import { encrypt, verified } from "../utils/bcrypt";
import { generateToken } from "../utils/jw.handle";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const registerNewUser = async ({ name, lastname, specialties, phoneNumber, medicalLicense, email, password }: User) => {
	const existingUser = await UserModel.findOne({ email });
	if (existingUser) {
		throw new Error("Email already exists");
	}

	const passHash = await encrypt(password);

	let newUser;
	let token;

	if (medicalLicense) {
		newUser = await DoctorModel.create({
			email,
			lastname,
			specialties,
			phoneNumber,
			password: passHash,
			name,
			medicalLicense,
		});
		token = jwt.sign({ email: newUser.email, isDoctor: true }, JWT_SECRET, { expiresIn: "60d" });
	} else {
		newUser = await PatientModel.create({
			email,
			password: passHash,
			name,
		});
		token = jwt.sign({ email: newUser.email, isDoctor: false }, JWT_SECRET, { expiresIn: "60d" });
	}

	return { user: newUser, token };
};

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
