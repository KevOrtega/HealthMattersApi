import { Router } from "express";
import { registerCtrl } from "../controllers/auth";
import { getDoctors, postDoctors, getDoctorsDetail, assignDoctor, deleteDoctor } from "../controllers/doctor";
import { logMiddleware } from "../middlewares/log";
import { registerNewUser } from "../services/auth";

const router = Router();

router.get("/", logMiddleware, getDoctors);
router.put("/assignDoctor/:_id", assignDoctor);
router.get("/:id", getDoctorsDetail);
router.post("/", postDoctors);
router.delete("/:_id", deleteDoctor);
export default router;
