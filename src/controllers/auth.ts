import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

const registerCtrl = async (req: Request, res: Response): Promise<void> => {
	try {
	  const body = req.body;
	  const responseUser = await registerNewUser(body);
	  res.status(200).send(responseUser);
	} catch (error) {
	  if (`${error}` === "Email already exists") {
		res.status(400).send("Email already exists");
	  } else {
		console.error(error);
		res.status(500).send("Internal Server Error");
	  }
	}
  };
  
  

const loginCtrl = async ({ body }: Request, res: Response) => {
	const { email, password, medicalLicense } = body;
	const user = await loginUser({ email, password, medicalLicense });

	if (user === "Password incorrect") {
		res.status(400);
		res.send(user);
	} else {
		res.send(user);
	}
};



export { registerCtrl, loginCtrl };
