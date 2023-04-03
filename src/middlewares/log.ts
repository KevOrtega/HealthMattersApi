import { verifyToken } from "../utils/jw.handle";
import { NextFunction, Request, Response } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const jwtByUser = req.cookies.authorization || "";
	const jwt = jwtByUser.split(" ").pop();
	const isUser = verifyToken(`${jwt}`);
  
	if (isUser) {
	  req.user = isUser;
	  console.log("User authenticated");
	} else {
	  console.log("User not authenticated");
	}
  
	next();
  };
  

export { logMiddleware };
