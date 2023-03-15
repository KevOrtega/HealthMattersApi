import { Router } from "express";
import { getDoctors, postDoctors, getDoctorsDetail } from "../controllers/doctor";

const router = Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorsDetail);
router.post("/", postDoctors);

export default router;
