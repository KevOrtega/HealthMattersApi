import { Request, Response } from "express";
import PatientModel from "../models/patient";
import ServiceModel, { Services } from "../models/services";

type getServicesQueries = {
	specialties?: string;
	search?: string;
	order?: "priceASC" | "priceDESC" | "ratingASC" | "ratingDESC" | "alphabeticallyASC" | "alphabeticallyDESC";
	page?: string;
};

const getServices = async (req: Request, res: Response) => {
	try {
		const { specialties, search, order, page }: getServicesQueries = req.query;

		const servicesPerPage = 6;
		const pageNumber = parseInt(page as string, 10) || 1;

		const orders_methods = {
			alphabeticallyASC: (arr: Services[]) => arr.sort((a, b) => a.name.localeCompare(b.name)),
			alphabeticallyDESC: (arr: Services[]) => arr.sort((a, b) => b.name.localeCompare(a.name)),
			priceASC: (arr: Services[]) =>
				arr.sort((a, b) => (a.prices?.atConsultory ?? a.prices?.atHome ?? 0) - (b.prices?.atConsultory ?? b.prices?.atHome ?? 0)),
			priceDESC: (arr: Services[]) =>
				arr.sort((a, b) => (b.prices?.atConsultory ?? b.prices?.atHome ?? 0) - (a.prices?.atConsultory ?? a.prices?.atHome ?? 0)),
			ratingASC: (arr: Services[]) => arr.sort((a, b) => a.rating - b.rating),
			ratingDESC: (arr: Services[]) => arr.sort((a, b) => b.rating - a.rating),
		};

		const specialtiesArray: string[] | undefined = specialties ? specialties.split(",") : undefined;

		const search_params = Object.assign(
			{},
			search
				? {
						name: new RegExp(`${search}.*`, "i"),
				  }
				: {},
			specialtiesArray ? { specialties: { $in: specialtiesArray } } : {},
			{ deleted: false } // Agregar filtro para obtener solo los servicios no borrados
		);

		const services = order
			? orders_methods[order](await ServiceModel.find(search_params))
			: await ServiceModel.find(search_params);
		if (!services.length) {
			throw new Error("No services found");
		}
		const servicesCount = services.length;
		const servicesToSkip = servicesPerPage * (pageNumber - 1);

		res.status(200).send({
			services: services.slice(servicesToSkip, servicesToSkip + servicesPerPage),
			currentPage: pageNumber,
			pages: Math.ceil(servicesCount / servicesPerPage),
			count: servicesCount,
		});
	} catch (error) {
		res.status(404).send({ message: "An error occurred while obtaining the services.", error });
	}
};

const postServices = async (req: Request, res: Response) => {
	try {
		const { name, description, prices, specialties, doctor } = req.body;
		const newService = new ServiceModel({ name, description, prices, rating: 1, doctor });
		const saveService = await newService.save();
		await saveService.updateOne({ $push: { specialties } });
		res.status(200).json(saveService);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const detailServices = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const servicesId = await ServiceModel.findById(id);
		res.send(servicesId);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};
const deleteService = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await ServiceModel.findByIdAndUpdate(_id, { deleted: true });
		res.status(200).json("Successfully deleted");
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
export { getServices, postServices, assignService, detailServices, deleteService };
