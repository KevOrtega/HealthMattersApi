import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import DoctorModel from "../models/doctor";
import PatientModel from "../models/patient";

declare global {
	namespace Express {
	  interface Request {
		user?: string | JwtPayload;
		isDoctor?: boolean;
	  }
	}
  }
  
  
  const profileDoctors = async (req: Request, res: Response) => {
	const user = req.user as JwtPayload | undefined;
	console.log(user);
	
	// const isDoctor = req.isDoctor as boolean | undefined;
  
	if (user) {
	  const doctor = await DoctorModel.findOne({ email: user.email });
	  if (!doctor) {
		return res.status(404).send('Doctor not found');
	  }
	  return res.send(doctor);
	} else {
	  return res.status(403).send('User is not a doctor');
	}
  };
  

  declare global {
	namespace Express {
	  interface Request {
		user?: string | JwtPayload;
		isDoctor?: boolean;
	  }
	}
  }

  const profilePatient = async (req: Request, res: Response) => {
	const user = req.user as JwtPayload | undefined;
	console.log(user);
	
	if (user) {
		const patient = await PatientModel.findOne({ email: user.email });
		if (!patient) {
		  return res.status(404).send('DPatient not found');
		}
		return res.send(patient);
	  } else {
		return res.status(403).send('User is not a patient');
	  }
	};
	
  


export { profileDoctors, profilePatient };
