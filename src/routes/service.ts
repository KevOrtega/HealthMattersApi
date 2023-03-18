import { Router } from "express";
import { getServices, postServices, assignService, detailServices, deleteService } from "../controllers/service";

const router = Router();

router.get("/", getServices)
router.put("/assignService/:_id", assignService)
router.get("/:_id", detailServices)
router.post("/", postServices)
router.delete("/:_id", deleteService)

export default router;