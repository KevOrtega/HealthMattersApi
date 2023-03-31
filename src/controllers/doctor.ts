import { Request, Response } from "express";
import DoctorModel from "../models/doctor";
import SpecialtyModel from "../models/specialty";

const getDoctors = async (req: Request, res: Response) => {
	try {
		const allDoctors = await DoctorModel.find().populate("specialties");
		res.status(200).send(allDoctors);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postDoctors = async (req: Request, res: Response) => {
	try {
<<<<<<< HEAD
		const { name, lastname, specialties, phoneNumber, medicalLicense, email, password, services } = req.body;
		const newDoctor = new DoctorModel({ name, lastname, specialties, services, phoneNumber, medicalLicense, email, password });
=======
		const { name, lastname, specialties, phoneNumber, medicalLicense, email, password } = req.body;
		const newDoctor = new DoctorModel({ name, lastname, specialties, phoneNumber, medicalLicense, email });
>>>>>>> 2d38763b2dbb108fef4822b4642c7f3af066db57
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

export { getDoctors, postDoctors, getDoctorsDetail, assignDoctor, deleteDoctor };
