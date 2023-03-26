import { Router } from "express";
import { order } from "../controllers/order";
import { checkJwt } from "../middlewares/session";

//solo pueden acceder las personas con sesion activa con JWT valido
const router = Router();

router.get("/", checkJwt, order);

export { router };
