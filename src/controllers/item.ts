import { Request, Response } from "express";
import DoctorModel from "../models/item";

const getDoctor = (req:Request, res:Response) => {
    try {
        
    } catch (error) {
        console.log('ERROR');
    }
}


const postDoctors = async (req:Request, res:Response) => {
    try {
        const { name, lastname, specialty, phoneNumber, registration, email} = req.body;
        const newDoctor = new DoctorModel({ name, lastname, specialty, phoneNumber, registration, email });
        const savedDoctor = await newDoctor.save();
        res.status(201).json({ doctor: savedDoctor });
    } catch (error) {
        console.log('ERROR');
    }
}

export {getDoctor, postDoctors}