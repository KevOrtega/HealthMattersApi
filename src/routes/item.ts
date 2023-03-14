import { Router } from "express";
import { getDoctors, postDoctors } from "../controllers/item";

const router = Router();

router.get("/", getDoctors);
router.post("/", postDoctors);

export default router;
