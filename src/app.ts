const express = require("express");
import "./db";
import router from "./routes/doctors.routes";
require("dotenv").config();

const app = (express.Application = express());
app.use("/", router);
app.use(express.json());

const PORT = process.env.PORT || 3000;
//connect port
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
