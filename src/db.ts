const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_UR } = process.env;

const client = new MongoClient(MONGODB_UR);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conexión a la base de datos exitosa!");
  } catch (err) {
    console.error(err);
  }
}
