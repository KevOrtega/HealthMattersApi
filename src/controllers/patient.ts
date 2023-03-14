import { Request, Response } from "express";
import { insertPatient, getPatients } from "../services/patients";

const getPatient = (req: Request, res: Response) => {
	try {
		// código para obtener un paciente por su ID
	} catch (error) {
		console.log("ERROR");
	}
};

const getPatientList = async (req: Request, res: Response) => {
	try {
		const response = await getPatients();
		res.json(response);
	} catch (error) {
		console.log("ERROR");
	}
};

const postPatient = async ({ body }: Request, res: Response) => {
	try {
		const response = await insertPatient(body);
		res.json(response);
	} catch (error) {
		console.log("ERROR");
	}
};

export { getPatient, getPatientList, postPatient };
