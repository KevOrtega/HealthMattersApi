import { Router } from "express";
import { getDoctors, postDoctors, getDoctorsDetail, putDoctor, deleteDoctor } from "../controllers/doctor";
import { logMiddleware } from "../middlewares/log";

const router = Router();

router.get("/", logMiddleware, getDoctors);
router.put("/", putDoctor);
router.get("/:id", getDoctorsDetail);
router.post("/", postDoctors);
router.delete("/:_id", deleteDoctor);
export default router;
