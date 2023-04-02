import { Request, Response } from "express";
import DoctorModel from "../models/doctor";
import SpecialtyModel from "../models/specialty";

const getDoctors = async (req: Request, res: Response) => {
	try {
		const allDoctors = await DoctorModel.find().populate("specialties");
		const activeDoctors = allDoctors.filter((doctor: { deleted: boolean }) => !doctor.deleted); // filtrar solo los doctores activos
		const count = activeDoctors.length; // contar doctores activos

		console.log(count);

		res.status(200).send({ count, data: activeDoctors }); // enviar el conteo y los doctores activos
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postDoctors = async (req: Request, res: Response) => {
	try {
		const { name, lastname, specialties, phoneNumber, medicalLicense, email, password } = req.body;
		const newDoctor = new DoctorModel({ name, lastname, specialties, phoneNumber, medicalLicense, email, password });
		const savedDoctor = await newDoctor.save();
		res.status(201).json(savedDoctor);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const getDoctorsDetail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doctorId = await DoctorModel.findById(id);
		res.send(doctorId);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const deleteLogDoctor = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await DoctorModel.findByIdAndUpdate(_id, { deleted: true }); // actualiza el campo deleted a true
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const undeleteDoctor = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await DoctorModel.findByIdAndUpdate(_id, { deleted: false });
		res.status(200).json("successfully undeleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const deleteDoctor = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await DoctorModel.findOneAndDelete({ _id });
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const assignDoctor = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const { doctors } = req.body;
		const updated = await SpecialtyModel.findByIdAndUpdate(_id, { $push: { doctors: doctors } });
		console.log(updated);

		res.send(`${updated?.name}`);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { getDoctors, postDoctors, getDoctorsDetail, assignDoctor, deleteDoctor, deleteLogDoctor, undeleteDoctor };
