import { Router } from "express";
import { getusers } from "../controllers/users";

const router = Router();

router.get("/", getusers);

export default router
