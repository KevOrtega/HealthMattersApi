import { Request, Response } from "express";
import ServiceModel from "../models/services";
import PatientModel from "../models/patient";

const getServices = async (req: Request, res: Response) => {
	try {
		const allServices = await ServiceModel.find({})
		res.status(200).send(allServices);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postServices = async (req: Request, res: Response) => {
	try {
		const { name, description, price, availability } = req.body;
		const newService = new ServiceModel({ name, description, price, availability });
		const saveService = await newService.save();
		res.status(200).json(saveService);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};


const detailServices = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const servicesId = await ServiceModel.findOne({ _id: id });
		res.send(servicesId);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};


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