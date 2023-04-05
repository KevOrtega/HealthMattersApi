import { NextFunction, Request, Response } from "express";
import PatientModel from "../models/patient";
import DoctorModel from "../models/doctor";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allUsers = [...(await DoctorModel.find()), ...(await PatientModel.find())];
		res.status(200).send(allUsers);
	} catch (error) {
		res.status(404).send({ mensaje: error });
	}
};

const deleteUsers = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const doctorUser = await DoctorModel.findById(id);
		const patientUser = await PatientModel.findById(id);

		if (doctorUser) {
			await DoctorModel.findByIdAndDelete(id);
			res.status(200).send({ message: "Doctor deleted successfully" });
		} else if (patientUser) {
			await PatientModel.findByIdAndDelete(id);
			res.status(200).send({ message: "Patient deleted successfully" });
		} else {
			res.status(404).send({ message: "User not found" });
		}
	} catch (error) {
		res.status(404).send({ message: "User not found" });
	}
};

export { getUsers, deleteUsers };
