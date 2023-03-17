import { Request, Response } from "express";
import DateModel from "../models/date";

const getDateList = async (req: Request, res: Response) => {
	try {
		const allDates = await DateModel.find({});
		res.send(allDates);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postDate = async (req: Request, res: Response) => {
	try {
		const { date, time, doctor, patient, service } = req.body;
		const newDate = new DateModel({ date, time, doctor, patient, service });
		const savedDate = await newDate.save();
		res.status(201).json({ date: savedDate });
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const getDate = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const dateId = await DateModel.findOne({ _id: id });
		res.send(dateId);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const putDate = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { date, time, doctor, patient, service } = req.body;
		const updatedDate = await DateModel.findOneAndUpdate({ _id: id }, { date, time, doctor, patient, service }, { new: true });
		res.status(200).json({ date: updatedDate });
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const deleteDate = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await DateModel.findOneAndDelete({ _id: id });
		res.status(204).send();
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { postDate, getDate, getDateList, putDate, deleteDate };
