import dotenv from "dotenv";

dotenv.config();
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
	await connect(`${process.env.MONGODB_URI}`);
}

export default dbConnect;
