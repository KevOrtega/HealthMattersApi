import { Router } from "express";
import DoctorsRouter from "./doctors.routes";

const router = Router();

router.use("/doctors", DoctorsRouter);

export default router;
