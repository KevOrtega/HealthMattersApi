import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jw.handle";

interface RequestExt extends Request {
	user?: string | JwtPayload;
}

const checkJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
	try {
		const jwtByUser = req.headers.authorization || "";
		const jwt = jwtByUser.split(" ").pop();
		const isUser = verifyToken(`${jwt}`);
		if (!isUser) {
			res.status(400);
			res.send("Invalid JWT");
		} else {
			req.user = isUser;
			console.log({ jwtByUser });
			next();
		}
	} catch (error) {
		res.status(400).send("Invalid session");
	}
};

export { checkJwt };
