import { Router } from "express";
import { logOut } from "../controllers/logout";

const router = Router();

router.get("/", logOut);

export { router };
