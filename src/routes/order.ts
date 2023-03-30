import { Router } from "express";
import { profileDoctors, profilePatient } from "../controllers/order";
import { checkJwt } from "../middlewares/session";

//solo pueden acceder las personas con sesion activa con JWT valido
const router = Router();

router.get("/", checkJwt, profileDoctors);
router.get("/", checkJwt, profilePatient);


export { router };
