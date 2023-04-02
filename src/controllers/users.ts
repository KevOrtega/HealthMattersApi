import { Request, Response } from "express";
import UserModel from "../models/auth";

const getUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await UserModel.find();
		res.status(200).send(allUsers);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const deleteUsers = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedUser = await UserModel.findByIdAndDelete(id);
		if (deletedUser) {
			res.status(200).send({ message: "User deleted successfully" });
		} else {
			res.status(404).send({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export { getUsers, deleteUsers };
