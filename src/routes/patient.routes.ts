import { Router } from "express";
import { getPatient, postPatient, getPatientList, assignPatient } from "../controllers/patient";

const router = Router()

router.get("/", getPatientList)
router.put("/assignPatient/:_id", assignPatient);
router.get("/:_id", getPatient)
router.post("/", postPatient)

export default router