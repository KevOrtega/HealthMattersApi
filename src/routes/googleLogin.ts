import express from "express";
import { googleLoginController } from "../controllers/loginGoogle";
import { Router } from "express";
const router = Router();

router.get("/", googleLoginController);

export { router };
