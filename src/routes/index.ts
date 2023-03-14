import { Router } from "express";
import doctorRouter from "./item";
import patientRouter from "./patient.routes";
const router = Router();

router.use("/doctors", doctorRouter);
router.use("/patients", patientRouter);

export default router;
