import { Router } from "express";
import { getSpecialty, postSpecialty, assignSpecialty, detailSpecialty } from "../controllers/specialty";

const router = Router();

router.get("/", getSpecialty);
router.get("/:id", detailSpecialty);
router.put("/assignSpecialty/:id", assignSpecialty);
router.post("/", postSpecialty)
export default router;
