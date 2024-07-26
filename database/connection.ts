import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log('ERROR OCCURRED HEREEREREREREREE');
    console.log(error);
    throw new Error('Connection failed!');
  }
};

export default connectDB;
