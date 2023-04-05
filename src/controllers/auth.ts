import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

const registerCtrl = async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const responseUser = await registerNewUser(body);
		res.send(responseUser);
	} catch (error) {
		(`${error}` === "Email already exists") 
			res.status(400).send("Email already exists");
	}
};

const loginCtrl = async ({ body }: Request, res: Response) => {
	try {
		const { email, password, medicalLicense } = body;
		const user = await loginUser({ email, password, medicalLicense });
		res.send(user);
	} catch (error) {
		res.status(400).send(`${error}`);
	}
};

export { registerCtrl, loginCtrl };
