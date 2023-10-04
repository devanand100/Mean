import mongoose from "mongoose";

 mongoose.connect("mongodb://localhost:27017/demo-dev",{  useNewUrlParser: true,
useUnifiedTopology: true,})

export const db = mongoose.connection ;

db.on('error',  (error) => {
    console.error('MongoDB connection error:', error)
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

