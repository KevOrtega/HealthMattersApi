import { Router } from "express";
import { getDoctors } from "../controllers/order";
import { checkJwt } from "../middlewares/session";

//solo pueden acceder las personas con sesion activa con JWT valido
const router = Router()


router.get('/', checkJwt, getDoctors)

export { router }