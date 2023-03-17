import { Router } from "express";
import { getDate, postDate, getDateList, putDate, deleteDate } from "../controllers/date";

const router = Router();

router.get("/", getDate);
router.get("/:id", getDateList);
router.post("/", postDate);
router.put("/:id", putDate);
router.delete("/:id", deleteDate);

export default router;
