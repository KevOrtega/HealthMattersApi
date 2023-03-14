import "dotenv/config"
import { connect } from "mongoose"

async function dbConnect(): Promise<void> {
    await connect('mongodb+srv://healthmatters:healthmatters@healthmatters.rabrrsd.mongodb.net/healthmatters')
}

export default dbConnect;