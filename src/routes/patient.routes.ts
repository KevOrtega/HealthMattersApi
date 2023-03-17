import { Router } from "express";
import { getPatient, postPatient, getPatientList, assignPatient } from "../controllers/patient";

const router = Router()

router.get("/", getPatientList)
router.put("/assignPatient/:id", assignPatient);
router.get("/:id", getPatient)
router.post("/", postPatient)

export default router