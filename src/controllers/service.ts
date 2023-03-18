import { Request, Response } from "express";
import PatientModel from "../models/patient";
import ServiceModel from "../models/services";

const getServices = async (req: Request, res: Response) => {
	try {
		const { specialties, search } = req.query;
		let services;
		if (search) {
			services = await ServiceModel.find({ name: { $in: search } });
		}
		if (specialties) {
			services = await ServiceModel.find({ specialties: { $in: [specialties] } });
		} else {
			services = await ServiceModel.find({});
		}
		res.status(200).send(services);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

// const getServices = async (req: Request, res: Response) => {
// 	try {
// 		const allServices = await ServiceModel.find({})
// 		res.status(200).send(allServices);
// 	} catch (error) {
// 		res.status(404).send({ message: error });
// 	}
// };

const postServices = async (req: Request, res: Response) => {
	try {
		const { name, description, price, availability, specialties } = req.body;
		const newService = new ServiceModel({ name, description, price, availability });
		const saveService = await newService.save();
		await saveService.updateOne({ $push: { specialties } });
		res.status(200).json(saveService);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const detailServices = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const servicesId = await ServiceModel.findOne({ _id });
		res.send(servicesId);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};


const deleteService = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await ServiceModel.deleteOne({ _id });
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};
// const assignService = async (req: Request, res: Response) => {
// 	try {
// 		const {_id} = req.params;
// 		const {patients} = req.body;
// 		const updated = await PatientModel.findByIdAndUpdate(_id,  {$push: { patients: patients}})
// 		res.status(200).send(`${updated?.name}`)
// 	} catch (error) {
// 		res.status(404).send({ message: error });
// 	}

const assignService = async (req: Request, res: Response) => {
	try {
		const {_id} = req.params;
		const {patients} = req.body;
		const updated = await PatientModel.findByIdAndUpdate(_id,  {$push: { patients: patients}})
		res.status(200).send(`${updated?.name}`)
	} catch (error) {
		res.status(404).send({ message: error });
	}
}
export { getServices, postServices, assignService, detailServices };
