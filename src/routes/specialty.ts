import { Router } from "express";
import { getSpecialty, postSpecialty } from "../controllers/specialty";

const router = Router();

router.get("/", getSpecialty);
router.post("/", postSpecialty)
export default router;
