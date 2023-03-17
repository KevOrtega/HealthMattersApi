import { Request, Response } from "express";
import DoctorModel from "../models/doctor";
import SpecialtyModel from "../models/specialty";


const getDoctors = async (req: Request, res: Response) => {
	try {
		const allDoctors = await DoctorModel.find().populate('specialties')
		res.status(200).send(allDoctors);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postDoctors = async (req: Request, res: Response) => {
	try {
		const { name, lastname, specialties, phoneNumber, registration, email } = req.body;
		const newDoctor = new DoctorModel({ name, lastname, specialties, phoneNumber, registration, email });
		const savedDoctor = await newDoctor.save();
		res.status(201).json(savedDoctor);
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

const assignDoctor = async (req: Request, res: Response) => {
	try {
		const {_id} = req.params;
		const {doctors} = req.body;
		const updated = await SpecialtyModel.findByIdAndUpdate(_id, {$push: {doctors: doctors}})
		console.log(updated);
		
		res.send(`${updated?.name}`)
	} catch (error) {
		res.status(404).send({ message: error });
	}
}

export { getDoctors, postDoctors, getDoctorsDetail, assignDoctor };
