import { Request, Response } from "express";
import DoctorModel from "../models/doctor";

const getDoctors = async (req: Request, res: Response) => {
	try {
		const allDoctors = await DoctorModel.find({});
		res.send(allDoctors);
	} catch (error) {
		console.log("ERROR");
	}
};

const postDoctors = async (req: Request, res: Response) => {
	try {
		const { name, lastname, specialty, phoneNumber, registration, email } = req.body;
		const newDoctor = new DoctorModel({ name, lastname, specialty, phoneNumber, registration, email });
		const savedDoctor = await newDoctor.save();
		res.status(201).json({ doctor: savedDoctor });
	} catch (error) {
		console.log("ERROR");
	}
};

const getDoctorsDetail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doctorId = await DoctorModel.findOne({ _id: id });
		res.send(doctorId);
	} catch (error) {
		console.log("Error");
	}
};

export { getDoctors, postDoctors, getDoctorsDetail };
