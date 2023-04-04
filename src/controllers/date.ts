import { Request, Response } from "express";
import DateModel from "../models/date";

const getDateList = async (req: Request, res: Response) => {
	try {
		const allDates = await DateModel.find({}).populate("patients");
		res.send(allDates);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postDate = async (req: Request, res: Response) => {
	try {
		const { date, time, patients } = req.body;
		const newDate = new DateModel({ date, time, patients });
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

const deleteDate = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		await DateModel.deleteOne({ _id });
		res.status(200).json("successfully deleted");
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const assignDate = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const { patients } = req.body;
		const updated = await DateModel.findByIdAndUpdate(_id, { $push: { patients: patients } });
		res.send(`${updated?.date}`);
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { postDate, getDate, getDateList, deleteDate, assignDate };
