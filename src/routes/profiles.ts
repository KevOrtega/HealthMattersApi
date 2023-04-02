import { Router } from "express";
import { profileDoctors, profilePatient } from "../controllers/profiles";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/", checkJwt, profilePatient);
router.get("/", checkJwt, profileDoctors);

export { router };
