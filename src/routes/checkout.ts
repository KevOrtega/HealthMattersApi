import { Router } from "express";
import { handler, handleNotifications } from "../utils/payments";

const router = Router();

router.post("/", handler);
router.post("/", handleNotifications);

export default router;
