import { Request, Response } from "express";
import PatientModel from "../models/patient";

const getPatientList = async (req: Request, res: Response) => {
	try {
		const allPatients = await PatientModel.find({});
		res.send(allPatients);
	} catch (error) {
		res.send(404).send({ message: error });
	}
};

const postPatient = async (req: Request, res: Response) => {
	try {
		const { name, lastname, email, address, phoneNumber } = req.body;
		const newPatient = new PatientModel({ name, lastname, email, address, phoneNumber });
		const savedPatient = await newPatient.save();
		res.status(201).json({ patient: savedPatient });
	} catch (error) {
		res.send(404).send({ message: error });
	}
};

const getPatient = async (req: Request, res: Response) => {
	// código para obtener un paciente por su ID
	try {
		const { id } = req.params;
		const patienId = await PatientModel.findOne({ _id: id });
		res.send(patienId);
	} catch (error) {
		res.send(404).send({ message: error });
	}
};

export { postPatient, getPatient, getPatientList };
