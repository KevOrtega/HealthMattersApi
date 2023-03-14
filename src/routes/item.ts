import { Router } from "express";
import { getDoctor, postDoctors } from "../controllers/item";

const router = Router();

router.get("/", getDoctor);
router.post("/", postDoctors);

export default router;
