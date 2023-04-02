import { Router } from "express";
import { profileDoctors, profilePatient } from "../controllers/profiles";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/profile/doctor", checkJwt, profileDoctors);
router.get("/profile/patient", checkJwt, profilePatient)


export { router };
