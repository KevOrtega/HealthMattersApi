import { Router } from "express";
import { getSpecialty, postSpecialty, assignSpecialty, detailSpecialty } from "../controllers/specialty";

const router = Router();

router.get("/", getSpecialty);
router.get("/:_id", detailSpecialty);
router.put("/assignSpecialty/:_id", assignSpecialty);
router.post("/", postSpecialty)
export default router;
