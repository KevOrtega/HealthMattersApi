import { Router } from "express";
import { getServices, postServices, detailServices } from "../controllers/service";
const router = Router();


router.get("/", getServices);
//router.put("/assignService/:_id", assignService)
router.get("/:id", detailServices);
router.post("/", postServices);

export default router;
