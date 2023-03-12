import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://healthmatters:healthmatters@healthmatters.rabrrsd.mongodb.net/healthmatters')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error(error));
