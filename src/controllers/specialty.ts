import { Request, Response } from "express";
import DoctorModel from "../models/doctor";
import SpecialtyModel from "../models/specialty";

const getSpecialty = async (req: Request, res: Response) => {
	try {
		const specialtyName = req.query.specialty;
		const specialty = await SpecialtyModel.findOne({ name: specialtyName }).populate("doctors");
		if (!specialty) {
			return res.status(404).send({ message: "Specialty not found" });
		}
		res.json(specialty.doctors);
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

// const getSpecialty = async (req: Request, res: Response) => {
// 	try {
// 		const specialities = await SpecialtyModel.find().populate("name");
// 		res.json(specialities);
// 	} catch (error) {
// 		res.status(404).send({ message: error });
// 	}
// };

const postSpecialty = async (req: Request, res: Response) => {
	try {
		//  const specialities = await data
		const { name } = req.body;
		const postSpecialities = new SpecialtyModel({ name });
		const saveSpecialities = await postSpecialities.save();
		res.status(200).send(saveSpecialities);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const detailSpecialty = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const specialtyId = await SpecialtyModel.findById(id);
		res.send(specialtyId);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const deleteSpecialty = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await SpecialtyModel.findByIdAndDelete({ _id });
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const assignSpecialty = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const { specialties } = req.body;
		const updated = await DoctorModel.findByIdAndUpdate(_id, { $push: { specialties: specialties } });
		res.send(`${updated?.name}`);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { getSpecialty, postSpecialty, assignSpecialty, detailSpecialty, deleteSpecialty };
