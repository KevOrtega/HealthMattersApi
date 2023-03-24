import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import DoctorModel from "../models/doctor";

interface RequestExt extends Request {
	user?: string | JwtPayload;
}

const getDoctors = async (req: RequestExt, res: Response) => {
	try {

		res.send({
			data: 'Solo sesion activa. JWT valido.',
			user: req.user
		})
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { getDoctors };
