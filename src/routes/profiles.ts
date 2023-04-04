import { Router } from "express";
import { profileDoctors, profilePatient } from "../controllers/profiles";
import { checkJwt } from "../middlewares/session";
import { logMiddleware } from "../middlewares/log";

const router = Router();

router.get("/profile/doctor", checkJwt, profileDoctors);
router.post("/profile/patient", checkJwt, profilePatient)


export { router };
