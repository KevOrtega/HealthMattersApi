import { Request, Response } from "express";
import PatientModel from "../models/patient";
import ServiceModel from "../models/services";

const getPatientList = async (req: Request, res: Response) => {
	try {
		const allPatients = await PatientModel.find().populate("doctors");

		const activePatients = allPatients.filter((patient: { deleted: boolean }) => !patient.deleted); // filtrar solo los pacientes activos
		const count = activePatients.length; // contar los activos
		res.status(200).send({ count, data: activePatients }); // enviar el conteo y los pacientes activos
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

const postPatient = async (req: Request, res: Response) => {
	try {
		const { name, lastname, email, address, phoneNumber } = req.body;
		const newPatient = new PatientModel({ name, lastname, email, address, phoneNumber });
		const savedPatient = await newPatient.save();
		res.status(201).json({ patient: savedPatient });
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

const getPatient = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const patienId = await PatientModel.findOne({ _id: id });
		res.send(patienId);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

const deletePatient = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await PatientModel.findByIdAndUpdate(_id, { deleted: true }); 
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const putPatient = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const { services } = req.body;
		const updated = await ServiceModel.findByIdAndUpdate(_id, { $push: { services: services } });
		res.status(200).send(`${updated?.name}`);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export { postPatient, getPatient, getPatientList, putPatient, deletePatient };
