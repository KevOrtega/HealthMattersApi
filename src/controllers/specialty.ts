import { Request, Response } from "express";
import axios from "axios";
import SpecialtyModel from "../models/specialty";


const getSpecialty = async (req: Request, res: Response) => {
	try {
        const allSpecilties = await axios.get('http://localhost:3001/specialties')
		const specialities = allSpecilties.data
        for (const specialty of specialities) {
			const newSpecialty = new SpecialtyModel(specialty);
			await newSpecialty.save();
		  }
		  res.send(specialities);          
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

const postSpecialty = async (req: Request, res: Response) => {
	try {
		const specialities = await axios.get('http://localhost:3001/specialties')
		const arraySpecialities = specialities.data
		const allSpecilties = arraySpecialities.save()
		res.status(200).send(allSpecilties)
		
		console.log(arraySpecialities);
		
	} catch (error) {
		
	}
}

export { getSpecialty, postSpecialty };

