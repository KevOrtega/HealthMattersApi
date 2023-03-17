import { Router } from "express";
import { getServices, postServices, assignService, detailServices } from "../controllers/service";

const router = Router();

router.get("/", getServices)
router.put("/assignService/:_id", assignService)
router.get("/:_id", detailServices)
router.post("/", postServices)

export default router;