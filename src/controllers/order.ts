import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
	user?: string | JwtPayload;
}

const order = async (req: RequestExt, res: Response) => {
	try {
		res.send({
			data: "It's okay, only people with valid JWT",
			user: req.user,
		});
	} catch (error) {
		res.status(404).send({ message: error });
	}
};

export { order };
