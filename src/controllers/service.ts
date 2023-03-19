import { Request, Response } from "express";
import PatientModel from "../models/patient";
import ServiceModel, { Services } from "../models/services";

type getServicesQueries = {
	specialties?: string[];
	search?: string;
	order?: "priceASC" | "priceDESC" | "ratingASC" | "ratingDESC";
	page?: string;
};

const getServices = async (req: Request, res: Response) => {
	try {
		const { specialties, search, order, page }: getServicesQueries = req.query;
		const servicesPerPage = 6;
		const pageNumber = parseInt(page as string, 10) || 1;

		const orders_methods = {
			priceASC: (arr: Services[]) => arr.sort((a, b) => a.price - b.price),
			priceDESC: (arr: Services[]) => arr.sort((a, b) => a.price - b.price),
			ratingASC: (arr: Services[]) => arr.sort((a, b) => a.price - b.price),
			ratingDESC: (arr: Services[]) => arr.sort((a, b) => a.price - b.price),
		};

		const search_params = Object.assign(
			{},
			search
				? {
						name: { $in: search },
				  }
				: {},
			specialties ? { specialties: { $in: specialties } } : {}
		);

		const services = order
			? orders_methods[order](await ServiceModel.find(search_params))
			: await ServiceModel.find(search_params);

		const servicesCount = services.length;
		const servicesToSkip = servicesPerPage * (pageNumber - 1);

		res.status(200).send({
			services: services.slice(servicesToSkip, servicesToSkip + servicesPerPage),
			currentPage: pageNumber,
			pages: Math.ceil(servicesCount / servicesPerPage),
			count: servicesCount,
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
		const { _id } = req.params;
		const { patients } = req.body;
		const updated = await PatientModel.findByIdAndUpdate(_id, { $push: { patients: patients } });
		res.status(200).send(`${updated?.name}`);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};
export { getServices, postServices, assignService, detailServices };
