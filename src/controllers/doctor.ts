import { Request, Response } from "express";
import DoctorModel from "../models/doctor";

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

const deleteDoctor = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await DoctorModel.findByIdAndUpdate(_id, { deleted: true }); // actualiza el campo deleted a true
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const putDoctor = async (req: Request, res: Response) => {
	try {
		const { doctorEmail, image } = req.body;
		await DoctorModel.findOneAndUpdate({ email: doctorEmail }, { image });
		res.status(200).json("Successfully updated");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { getDoctors, postDoctors, getDoctorsDetail, putDoctor, deleteDoctor };
