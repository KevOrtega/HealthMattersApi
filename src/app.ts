import "dotenv/config";
import express from "express";
import cors from "cors";
import routerDoctors from "./routes/doctor";
import routerPatients from "./routes/patient.routes"
import db from "./config/mongo";
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/doctors", routerDoctors);
app.use("/patients", routerPatients);

db().then(() => console.log("Conexion DB exitosa"));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
