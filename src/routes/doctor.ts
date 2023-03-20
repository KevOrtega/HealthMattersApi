import { Router } from "express";
import { getDoctors, postDoctors, getDoctorsDetail, assignDoctor, deleteDoctor } from "../controllers/doctor";

const router = Router();

router.get("/", getDoctors);
router.put("/assignDoctor/:_id", assignDoctor);
router.get("/:id", getDoctorsDetail);
router.post("/", postDoctors);
router.delete("/:_id", deleteDoctor);
export default router;
