import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import DoctorModel from "../models/doctor";
import PatientModel from "../models/patient";
import { User } from "../interface/user.interface";

declare global {
	namespace Express {
		interface Request {
			user?: string | JwtPayload;
			isDoctor?: boolean;
		}
	}
}

export const profile = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.replace("Bearer ", "");

		if (!token) throw new Error("token is required");
		jwt.verify(token, process.env.JWT_SECRET || "", async function (err: any, user: any) {
			if (err) throw new Error(err);
			return res.send(
				user.isDoctor ? await DoctorModel.findOne({ email: user.email }) : await PatientModel.findOne({ email: user.email })
			);
		});
	} catch (error) {
		res.status(300).send(`${error}`);
	}
};

export const profileDoctors = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.replace("Bearer ", "");

		if (!token) throw new Error("token is required");
		jwt.verify(token, process.env.JWT_SECRET || "", async function (err: any, user: any) {
			if (err) throw new Error(err);
			return res.send(await DoctorModel.findOne({ email: user.email }));
		});
	} catch (error) {
		res.status(300).send(`${error}`);
	}
};

declare global {
	namespace Express {
		interface Request {
			user?: string | JwtPayload;
		}
	}
}

export const profilePatient = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.replace("Bearer ", "");

		if (!token) throw new Error("token is required");
		jwt.verify(token, process.env.JWT_SECRET || "", async function (err: any, user: any) {
			if (err) throw new Error(err);
			return res.send(await PatientModel.findOne({ email: user.email }));
		});
	} catch (error) {
		res.status(300).send(`${error}`);
	}
};

export const profileAdmin = async (req: Request, res: Response) => {
	const user = req.user as User | undefined;

	return user && user.email === "admin@gmail.com" && user.password === "admin"
		? res.send(user)
		: res.status(403).send("User is not an admin");
};
