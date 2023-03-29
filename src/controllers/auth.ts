import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

const registerCtrl = async ({ body }: Request, res: Response) => {
	try {
		const responseUser = await registerNewUser(body);
		res.send(responseUser);
	} catch (error) {
		res.status(400).json("Email already exists")
	}
};

const loginCtrl = async ({ body }: Request, res: Response) => {
	const { email, password, medicalLicense } = body;
	const responseUser = await loginUser({ email, password, medicalLicense });

	if (responseUser === "Password incorrect") {
		res.status(400);
		res.send(responseUser);
	} else {
		res.send(responseUser);
	}
};



export { registerCtrl, loginCtrl };
