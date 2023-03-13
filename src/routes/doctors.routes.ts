import { Router } from "express";
import Doctor from "../models/Doctor";

const router = Router();

router.get("/", async (req, res) => {
	res.send(await Doctor.find());
});

router.post("/", (req, res) => {
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
