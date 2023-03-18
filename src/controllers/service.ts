import { Request, Response } from "express";
import PatientModel from "../models/patient";
import ServiceModel from "../models/services";

const getServices = async (req: Request, res: Response) => {
	try {
		const { specialties, search, price, rating, page } = req.query;
		const servicesPerPage = 6;
		const pageNumber = parseInt(page as string, 10) || 1;

		let services;
		if (search) {
			services = await ServiceModel.find({ name: { $in: search } })
		}
		if (specialties) {
			services = await ServiceModel.find({ specialties: { $in: [specialties] }})
		} else {
			services = await ServiceModel.find({})
		}
		if (price === 'ASC' ) {
			services = services.sort((a, b) => a.price - b.price);
		}
        if (price === 'DESC') {
			services = services.sort((a, b) => b.price - a.price);
		}
		if (rating === 'ASC') {
			services = services.sort((a, b) => a.rating - b.rating)
		}
        if ( rating === 'DESC') {
			services = services.sort((a, b) => b.rating - a.rating)
		}
		const servicesCount = services.length;
		const servicesToSkip = servicesPerPage * (pageNumber - 1);

		services = services.slice(servicesToSkip, servicesToSkip + servicesPerPage);

		res.status(200).send({
			services,
			currentPage: pageNumber,
			pages: Math.ceil(servicesCount / servicesPerPage),
			count: servicesCount
		  });
	} catch (error) {
		res.status(404).send({ message: error });
	}
};




const postServices = async (req: Request, res: Response) => {
	try {
		const { name, description, price, availability, specialties, rating } = req.body;
		const newService = new ServiceModel({ name, description, price, availability, rating });
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
