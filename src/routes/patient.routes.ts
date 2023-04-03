import { Router } from "express";
import { getPatient, postPatient, getPatientList, deletePatient } from "../controllers/patient";

const router = Router();

router.get("/", getPatientList);
// router.put("/assignPatient/:_id", assignPatient);
router.get("/:id", getPatient);
router.post("/", postPatient);
router.delete("/:_id", deletePatient);
export default router;
