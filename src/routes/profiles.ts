import { Router } from "express";
import { profileDoctor, profilePatient } from "../controllers/profiles";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/", checkJwt, profilePatient);
router.get("/", checkJwt, profileDoctor);


export { router };
