import { Request, Response } from "express";
import DoctorModel from "../models/doctor";
import axios from "axios"

const getDoctors = async (req: Request, res: Response) => {
	try {
		const doctors = await axios.get('http://localhost:3001/doctors')
		const allDoctors = await DoctorModel.find({});
		res.send(allDoctors);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postDoctors = async (req: Request, res: Response) => {
	try {
		const { name, lastname, specialty, phoneNumber, registration, email } = req.body;
		const newDoctor = new DoctorModel({ name, lastname, specialty, phoneNumber, registration, email });
		const savedDoctor = await newDoctor.save();
		res.status(201).json({ doctor: savedDoctor });
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const getDoctorsDetail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doctorId = await DoctorModel.findOne({ _id: id });
		res.send(doctorId);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { getDoctors, postDoctors, getDoctorsDetail };
