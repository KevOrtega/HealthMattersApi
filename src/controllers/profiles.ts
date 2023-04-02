import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
	user?: string | JwtPayload;
	medicalLicense?: string | JwtPayload
}

const profileDoctors = async (req: RequestExt, res: Response) => {
	try {
	//   const { medicalLicense } = req.user;
	//   if (!medicalLicense) {
	// 	return res.status(401).send({ message: "Unauthorized" });
	//   }
  
	  // Si llega aquí es porque el usuario es un doctor
	  res.send({
		data: "Only doctors with valid JWT",
		user: req.user,
	  });
	} catch (error) {
	  res.status(404).send({ message: error });
	}
  };
  

const profilePatient = async (req: RequestExt, res: Response) => {
	try {
		res.send({
			data: "Only patients with valid JWT",
			user: req.user,
		});
	} catch (error) {
		res.status(404).send({ message: error });
	}
};


export { profileDoctors, profilePatient };
