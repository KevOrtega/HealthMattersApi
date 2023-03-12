import express from "express";
import "./db";
import router from "./routes";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(router);
app.use(express.json());

//connect port
app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});
