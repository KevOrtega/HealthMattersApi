import express from "express";
import cors from "cors";
import db from "./config/mongo";
import { config } from "dotenv";
import routerDoctors from "./routes/doctor";
import routerPatients from "./routes/patient.routes";
import routerSpecialties from "./routes/specialty";
import routerServices from "./routes/service";
import routerDates from "./routes/date";
import checkoutRouter from "./routes/checkout";
import handleNotifications from "./routes/checkout";
import { loginCtrl, registerCtrl } from "./controllers/auth";
import { order } from "./controllers/order";
import { checkJwt } from "./middlewares/session";

config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/doctors", routerDoctors);
app.use("/patients", routerPatients);
app.use("/specialties", routerSpecialties);
app.use("/services", routerServices);
app.use("/dates", routerDates);
app.use("/checkout", checkoutRouter);
app.post("/notifications", handleNotifications);
app.use("/auth/register", registerCtrl);
app.use("/auth/login", loginCtrl);
app.use("/order", checkJwt, order);

db().then(() => console.log("Conexion DB exitosa"));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
