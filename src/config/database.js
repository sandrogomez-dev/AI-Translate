import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // For demo purposes, we'll skip MongoDB connection
    if (process.env.NODE_ENV === 'demo' || !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost')) {
      console.log('📝 Running in demo mode - MongoDB connection skipped');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('📝 Continuing in demo mode without database...');
  }
};

export default connectDB;

