import { Router } from "express";
import { getPatient, postPatient, getPatientList, putPatient, deletePatient } from "../controllers/patient";

const router = Router();

router.get("/", getPatientList);
router.put("/:_id", putPatient);
router.get("/:id", getPatient);
router.post("/", postPatient);
router.delete("/:_id", deletePatient);
export default router;
