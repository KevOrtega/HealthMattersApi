import { Router } from "express";
import { googleLoginController } from "../controllers/loginGoogle";

const router = Router();

router.get("/", googleLoginController);

export { router };
