import { Router } from "express";
import { getDoctor, postDoctors } from "../controllers/item";

const router = Router();

<<<<<<< HEAD
// router.get('/doctors', getDoctors)
router.get('/doctors/:id', getDoctor)
router.post('/doctors', postDoctors)
=======
router.get("/", getDoctors);
router.post("/", postDoctors);
>>>>>>> lilieth

export default router;
