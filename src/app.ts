import express = require('express');
import router from './routes/doctors.routes';

const app: express.Application = express();
app.use('/', router)
app.use(express.json())

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});