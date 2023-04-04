import { Router } from "express";
import { buyServices } from "../controllers/checkout";
import { handleNotifications } from "../utils/payments";

const router = Router();

router.post("/", buyServices);
router.post("/", handleNotifications);

export default router;
