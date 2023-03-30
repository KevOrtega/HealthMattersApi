import { Request, Response } from "express";
import UserModel from "../models/auth";

const getusers = async (req: Request, res: Response) => {
	try {
		const allusers = await UserModel.find();
		res.status(200).send(allusers);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { getusers }