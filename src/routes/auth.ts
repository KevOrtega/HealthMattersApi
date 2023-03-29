import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth";
const router = Router();

///auth/login o register

router.post("/", registerCtrl);
router.post("/", loginCtrl);
    
export default router;
