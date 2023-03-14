import { Router } from "express";
import { getDoctors, postDoctors } from "../controllers/item";

const router = Router()

router.get('/doctors', getDoctors)
router.post('/doctors', postDoctors)

export {router}