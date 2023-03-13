import express from "express";
import "./db";
import router from "./routes";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(router);

//connect port
app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});
