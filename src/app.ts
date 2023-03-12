const express = require('express')
const mongoose = require('mongoose')
import router from './routes/doctors.routes';
require('dotenv').config()


const app= express.Application = express();
app.use('/', router)
app.use(express.json())
//mongoDB conexion 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected mongodb atlas'))
.catch((error:Error) => console.error(error))


const PORT = process.env.PORT || 3000
//connect port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})




