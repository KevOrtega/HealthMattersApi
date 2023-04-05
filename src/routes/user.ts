import { Router } from "express";
import { deleteUsers, putUsers, getUsers } from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.put("/", putUsers);
router.delete("/:id", deleteUsers);

export default router;
