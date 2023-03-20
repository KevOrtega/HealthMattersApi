import { Request, Response } from "express";
import specialities from "../data";
import DoctorModel from "../models/doctor";
import SpecialtyModel, { Specialty } from "../models/specialty";

type getSpecialtyQueries = {
	doctors?: string;
	search?: string;
	order?: "nameASC" | "nameDESC";
	page?: string;
};

const getSpecialty = async (req: Request, res: Response) => {
	try {
		const { doctors, search, order, page }: getSpecialtyQueries = req.query;

		const specialtiesPerPage = 6;
		const pageNumber = parseInt(page as string, 10) || 1;

		const orders_methods = {
			nameASC: (arr: Specialty[]) => arr.sort((a, b) => a.name.localeCompare(b.name)),
			nameDESC: (arr: Specialty[]) => arr.sort((a, b) => b.name.localeCompare(a.name)),
		};

		const doctorsArray: string[] | undefined = doctors ? (Array.isArray(doctors) ? doctors : [doctors]) : undefined;

		const search_params = Object.assign(
			{},
			search
				? {
						name: new RegExp(`^${search}$`, "i"),
				  }
				: {},
			doctorsArray ? { doctors: { $in: doctorsArray } } : {}
		);

		const specialties = order
			? orders_methods[order](await SpecialtyModel.find(search_params))
			: await SpecialtyModel.find(search_params);

		const specialtiesCount = specialties.length;
		const specialtiesToSkip = specialtiesPerPage * (pageNumber - 1);

		res.status(200).send({
			specialties: specialties.slice(specialtiesToSkip, specialtiesToSkip + specialtiesPerPage),
			currentPage: pageNumber,
			pages: Math.ceil(specialtiesCount / specialtiesPerPage),
			count: specialtiesCount,
		});
	} catch (error) {
		res.status(404).send({ message: error });
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
		const { name } = req.body;
		const postSpecialties = new SpecialtyModel({ name });
		const saveSpecialties = await postSpecialties.save();
		// Agregar especialidad a un Doctor
		await DoctorModel.updateOne({ _id: req.body.doctorId }, { $push: { specialties: postSpecialties._id } });
		res.status(200).send(saveSpecialties);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

// const postSpecialty = async (req: Request, res: Response) => {
// 	try {
// 		//  const specialities = await data
// 		const { name } = req.body;
// 		const postSpecialities = new SpecialtyModel({ name });
// 		const saveSpecialities = await postSpecialities.save();
// 		res.status(200).send(saveSpecialities);
// 	} catch (error) {
// 		res.status(404).send({ message: error });
// 	}
// };

const detailSpecialty = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const specialtyId = await SpecialtyModel.findOne({ _id: id });
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
