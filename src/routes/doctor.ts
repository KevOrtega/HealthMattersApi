import { Router } from "express";
import { getDoctors, postDoctors, getDoctorsDetail, assignDoctor} from "../controllers/doctor";

const router = Router();

router.get("/", getDoctors);
router.put("/assignDoctor/:id", assignDoctor);
router.get("/:id", getDoctorsDetail);
router.post("/", postDoctors);

export default router;
