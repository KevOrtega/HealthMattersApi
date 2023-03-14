import { Router } from "express";
import { getPatientList, postPatient } from "../controllers/patient";

const router = Router();

router.get("/", getPatientList);
router.post("/", postPatient);

export default router;
