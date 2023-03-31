import { Router } from "express";
import { deleteUsers, getUsers } from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.delete("/:id", deleteUsers);

export default router;
