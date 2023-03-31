import { Router } from "express";
import { buyServices } from "../controllers/checkout";
import { handleNotifications } from "../utils/payments";

const router = Router();

router.post("/:id", buyServices);
router.post("/notification", handleNotifications);

export default router;
