import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";
import jwt from "jsonwebtoken"


const generateToken = (id: string) => {
	jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 + 24 * 30,
			id
		}, JWT_SECRET)
};

const verifyToken = (jwt: string) => {
	const isOk = verify(jwt, JWT_SECRET);
	return isOk;
};

export { generateToken, verifyToken };
