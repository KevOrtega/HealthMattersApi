import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
	user?: string | JwtPayload;
}

const profileDoctors = async (req: RequestExt, res: Response) => {
	try {
		res.send({
			data: "It's okay, only Doctors with valid JWT",
			user: req.user,
		});
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const profilePatient = async (req: RequestExt, res: Response) => {
	try {
		res.send({
			data: "It's okay, only Patients with valid JWT",
			user: req.user,
		});
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { profileDoctors, profilePatient };
