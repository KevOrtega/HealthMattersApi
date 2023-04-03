import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jw.handle";

interface RequestExt extends Request {
	user?: string | JwtPayload;
	isDoctor?: boolean
}

const checkJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
	try {
	  const jwt = req.cookies.authorization || "";
	  const isUser = verifyToken(jwt);
	  if (!isUser) {
		res.status(400);
		res.send("Invalid JWT");
	  } else {
		req.user = isUser;
		console.log({ jwt });
		next();
	  }
	} catch (error) {
	  res.status(400).send("Invalid session");
	}
  };
  
  export { checkJwt };
  
