import { Auth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import UserModel from "../models/auth";
import { encrypt, verified } from "../utils/bcrypt";
import { generateToken } from "../utils/jw.handle";
import jwt from "jsonwebtoken"
import PatientModel from "../models/patient";
import DoctorModel from "../models/doctor";
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const registerNewUser = async ({ email, password, name, medicalLicense }: User) => {
  const checkIs = await UserModel.findOne({ email });
  
  if (checkIs) {
    throw new Error("Email already exists");
  }
  const passHash = await encrypt(password);

  let newUser;

if (medicalLicense) {
  newUser = await DoctorModel.create({
    email,
    password: passHash,
    name,
    medicalLicense,
  });
} else {
  newUser = await PatientModel.create({
    email,
    password: passHash,
    name,
  });
}

const savedUser = await UserModel.create({
  email,
  password: passHash,
  name,
  medicalLicense,
  newUser: medicalLicense ? 'doctor' : 'patient', // Agregar el tipo de usuario en UserModel
  userRef: newUser._id, // Agregar la referencia al usuario creado (Doctor o Patient)
});

  
  const token = jwt.sign(
    { email: savedUser.email },
    JWT_SECRET,
    { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 + 24 * 30 }
  );
  
  return { user: registerNewUser, token };
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
