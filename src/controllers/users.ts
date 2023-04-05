import { Request, Response, NextFunction } from "express";
import UserModel from "../models/auth";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allUsers = await UserModel.find();
		res.status(200).send(allUsers);
	} catch (error) {
		res.status(404).send({ mensaje: error });
	}
};

const deleteUsers = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await UserModel.findByIdAndUpdate(id, { deleted: true });
		res.status(200).send({ message: "User deleted successfully" });
	} catch (error) {
		res.status(404).send({ message: "User not found" });
	}
};

export { getUsers, deleteUsers };
