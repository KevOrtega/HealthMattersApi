import { Router } from "express";
import Doctor from "../models/Doctor";

const router = Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

router.post("/", (req, res) => {
  console.log(req.body);
  const user = new Doctor(req.body);
  user
    .save()
    .then((data: any) => res.json(data))
    .catch((error: Error) =>
      res.status(300).json({
        message: error,
      })
    );
});

export default router;
