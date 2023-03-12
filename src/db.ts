const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conexión a la base de datos exitosa!");
  } catch (err) {
    console.error(err);
  }
}
