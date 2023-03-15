import { Router } from "express";
import { getPatient, postPatient, getPatientList } from "../controllers/patient";

const router = Router()

router.get("/", getPatient)
router.get("/:id", getPatientList)
router.post("/", postPatient)

export default router