import { Request, Response } from "express";
import { inserItem, getDrs } from "../services/item";

const getDoctor = (req:Request, res:Response) => {
    try {
        
    } catch (error) {
        console.log('ERROR');
    }
}

const getDoctors= async (req:Request, res:Response) => {
    try {
        const response = getDrs()
        res.send(response)
    } catch (error) {
        console.log('ERROR');
        
    }
}

const postDoctors = async ({body}:Request, res:Response) => {
    try {
        const response = await inserItem(body)
        res.send(response)
    } catch (error) {
        console.log('ERROR');
    }
}

export {getDoctor, getDoctors, postDoctors}