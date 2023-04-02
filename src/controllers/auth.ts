import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

const registerCtrl = async (req: Request, res: Response): Promise<void> => {
	try {
	  const body = req.body;
	  const responseUser = await registerNewUser(body);
	  res.status(200).send(responseUser);
	} catch (error) {
	  if (`${error}` === "Email already exists") {
		// Si el error es que el correo electrónico ya existe, se devuelve un error 400
		res.status(400).send("Email already exists");
	  } else {
		// Si no, entonces se lanza un error 500 (error interno del servidor)
		console.error(error);
		res.status(500).send("Internal Server Error");
	  }
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
