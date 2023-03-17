import { Request, Response } from "express";
import DoctorModel from "../models/doctor";
import SpecialtyModel from "../models/specialty";
const data = require('../../src/data.js')

const getSpecialty = async (req: Request, res: Response) => {
	try {
		const specialities = await SpecialtyModel.find().populate('doctors', 'name');
		res.json(specialities)
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postSpecialty = async (req: Request, res: Response) => {
	try {
	//  const specialities = await data
	 const {name} = req.body
	 const postSpecialities = new SpecialtyModel({ name })
	 const saveSpecialities = await postSpecialities.save()
	 res.status(200).send(saveSpecialities)
	} catch (error) {
		res.status(404).send({ message: error });
	}
}


const detailSpecialty = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const specialtyId = await SpecialtyModel.findOne({ _id: id });
		res.send(specialtyId);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const assignSpecialty = async (req: Request, res: Response) => {
	try {
		const {_id} = req.params;
		const {specialties} = req.body
		const updated = await DoctorModel.findByIdAndUpdate(_id, {$push: {specialties: specialties}})
		res.send(`${updated?.name}`)
	} catch (error) {
		
	}
}

export { getSpecialty, postSpecialty, assignSpecialty, detailSpecialty };

