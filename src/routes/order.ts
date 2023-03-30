import { Router } from "express";
import { profilePatient } from "../controllers/profiles";
import { checkJwt } from "../middlewares/session";

//solo pueden acceder las personas con sesion activa con JWT valido
const router = Router();

router.get("/", checkJwt, profilePatient);

export { router };
