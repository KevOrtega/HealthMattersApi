import { Router } from "express";
import { getDate, postDate, getDateList, deleteDate, assignDate } from "../controllers/date";

const router = Router();

router.get("/", getDateList);
router.get("/:_id", getDate);
router.post("/", postDate);
router.put("/assignDate/:_id", assignDate);
router.delete("/:_id", deleteDate);


export default router;
