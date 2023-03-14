import { Router } from "express";
import { getDoctor, postDoctors } from "../controllers/item";

const router = Router()

// router.get('/doctors', getDoctors)
router.get('/doctors/:id', getDoctor)
router.post('/doctors', postDoctors)

export {router}