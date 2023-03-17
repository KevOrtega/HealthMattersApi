import { Router } from "express";
import { getServices, postServices, assignService, detailServices } from "../controllers/service";

const router = Router();

router.get("/", getServices)
router.put("/assignService/:id", assignService)
router.get("/:id", detailServices)
router.post("/", postServices)

export default router;