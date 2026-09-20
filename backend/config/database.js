import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nextgen-academy';
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Running in demo mode.', error.message);
    return false;
  }
};

export default connectDB;
