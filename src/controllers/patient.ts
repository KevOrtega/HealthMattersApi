import { Request, Response } from "express";

const getPatient = (req: Request, res: Response) => {
	try {
		// código para obtener un paciente por su ID
	} catch (error) {
		console.log("ERROR");
	}
};

const getPatientList = async (req: Request, res: Response) => {
	try {
		const response =  ""
		res.json();
	} catch (error) {
		console.log("ERROR");
	}
};

const postPatient = async ({ body }: Request, res: Response) => {
	try {
		const response = ""
		res.json(response);
	} catch (error) {
		console.log("ERROR");
	}
};

export { getPatient, getPatientList, postPatient };
