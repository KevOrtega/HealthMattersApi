import { Router } from "express";
import { getSpecialty, postSpecialty, assignSpecialty, detailSpecialty, deleteSpecialty } from "../controllers/specialty";

const router = Router();

router.get("/", getSpecialty);
router.get("/:id", detailSpecialty);
router.put("/assignSpecialty/:_id", assignSpecialty);
router.post("/", postSpecialty);
router.delete("/:_id", deleteSpecialty);
export default router;
